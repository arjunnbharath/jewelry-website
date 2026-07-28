"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  calculateShipping,
  generateOrderNumber,
} from "@/lib/checkout";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";
import { getEffectivePrice, parseImages } from "@/lib/site";

const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
});

const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  phone: z.string().trim().optional(),
  addressLine1: z.string().trim().min(1, "Address is required"),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  postalCode: z.string().trim().min(1, "Postal code is required"),
  country: z.string().trim().min(1, "Country is required"),
  notes: z.string().trim().optional(),
  items: z.array(checkoutItemSchema).min(1, "Your cart is empty"),
});

export type PlaceOrderInput = z.infer<typeof checkoutSchema>;

export type PlaceOrderResult =
  | { success: true; orderNumber: string }
  | { success: false; error: string };

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid checkout details";
    return { success: false, error: firstError };
  }

  const data = parsed.data;
  const productIds = [...new Set(data.items.map((item) => item.productId))];

  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  const productMap = new Map(products.map((product) => [product.id, product]));

  const lineItems: {
    productId: string;
    productName: string;
    productSlug: string;
    image: string;
    price: number;
    quantity: number;
  }[] = [];

  for (const item of data.items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return { success: false, error: "One or more items are no longer available." };
    }
    if (product.stock < item.quantity) {
      return {
        success: false,
        error: `Not enough stock for ${product.name}. Only ${product.stock} left.`,
      };
    }

    const images = parseImages(product.images);
    lineItems.push({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image:
        images[0] ?? FALLBACK_PRODUCT_IMAGE,
      price: getEffectivePrice(product.price, product.salePrice),
      quantity: item.quantity,
    });
  }

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  let orderNumber = generateOrderNumber();
  let attempts = 0;

  while (attempts < 5) {
    const existing = await prisma.order.findUnique({
      where: { orderNumber },
      select: { id: true },
    });
    if (!existing) break;
    orderNumber = generateOrderNumber();
    attempts += 1;
  }

  try {
    await prisma.$transaction(async (tx) => {
      for (const item of lineItems) {
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: { stock: { decrement: item.quantity } },
        });

        if (updated.count !== 1) {
          throw new Error(`Insufficient stock for ${item.productName}`);
        }
      }

      await tx.order.create({
        data: {
          orderNumber,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone || null,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2 || null,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          subtotal,
          shipping,
          total,
          notes: data.notes || null,
          items: {
            create: lineItems.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              productSlug: item.productSlug,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to place your order.";
    return { success: false, error: message };
  }

  return { success: true, orderNumber };
}
