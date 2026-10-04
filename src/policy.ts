import { isProductId } from './ids';
import type { Decision, Role, Status } from './types';

export function evaluatePolicy(
  record: { id?: unknown; status?: Status } | null | undefined,
  role: Role
): Decision {
  if (!record || !isProductId(record.id)) {
    return { allowed: false, reason: 'invalid-id' };
  }
  if (role === 'viewer') {
    return { allowed: record.status === 'published', reason: 'viewer-read-only' };
  }
  if (role === 'editor') {
    if (record.status === 'archived') {
      return { allowed: false, reason: 'archived-locked' };
    }
    return { allowed: true, reason: 'editor-ok' };
  }
  if (role === 'owner') {
    return { allowed: true, reason: 'owner-ok' };
  }
  return { allowed: false, reason: 'unknown-role' };
}

export function canTransition(from: Status, to: Status): boolean {
  const graph: Record<string, Status[]> = {
    draft: ['published', 'archived'],
    published: ['archived'],
    archived: [],
  };
  switch (from) {
    case 'draft':
    case 'published':
    case 'archived':
      return (graph[from] || []).includes(to);
    default:
      return false;
  }
}
