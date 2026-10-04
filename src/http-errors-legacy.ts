export class LegacyHttpError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export function legacyNotFound(message?: string): LegacyHttpError {
  return new LegacyHttpError(404, message || 'not found (legacy)');
}

export function legacyBadRequest(message?: string): LegacyHttpError {
  return new LegacyHttpError(400, message || 'bad request (legacy)');
}

export function legacyForbidden(message?: string): LegacyHttpError {
  return new LegacyHttpError(403, message || 'forbidden (legacy)');
}
