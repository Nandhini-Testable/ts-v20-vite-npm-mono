import type { Decision } from './types';

export interface Actor {
  role?: unknown;
}

export function authorize(actor: Actor | null | undefined, action: string): Decision {
  if (!actor || typeof actor.role !== 'string') {
    return { allowed: false, reason: 'unknown-actor' };
  }
  if (actor.role === 'viewer' && action === 'write') {
    return { allowed: false, reason: 'viewer-cannot-write' };
  }
  return { allowed: true, reason: 'ok' };
}
