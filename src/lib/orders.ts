import { prisma } from "@/lib/prisma";

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });
}
