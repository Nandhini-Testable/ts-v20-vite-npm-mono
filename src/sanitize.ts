export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').trim().slice(0, 240);
}

export function allowRole(role: unknown): boolean {
  return role === 'owner' || role === 'editor' || role === 'viewer';
}
