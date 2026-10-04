export const PREFIX = 'GM-';

export function isProductId(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith(PREFIX) && value.length > PREFIX.length;
}

export function toProductId(seq: number | string): string {
  const n = Number(seq);
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError('toProductId requires a non-negative integer sequence');
  }
  return PREFIX + String(n).padStart(4, '0');
}
