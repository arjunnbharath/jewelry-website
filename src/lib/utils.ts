export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseImages(images: string): string[] {
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function formatPrice(amount: number, symbol = "$") {
  return `${symbol}${amount.toFixed(2)}`;
}

export function getEffectivePrice(price: number, salePrice?: number | null) {
  return salePrice != null && salePrice < price ? salePrice : price;
}

export function isInStock(stock: number) {
  return stock > 0;
}
