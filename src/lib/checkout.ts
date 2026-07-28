export const FREE_SHIPPING_THRESHOLD = 150;
export const FLAT_SHIPPING_RATE = 9.95;

export function calculateShipping(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
}

export function generateOrderNumber() {
  const date = new Date();
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LM-${datePart}-${randomPart}`;
}
