export class HttpError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export function notFound(message?: string): HttpError {
  return new HttpError(404, message || 'not found');
}

export function badRequest(message?: string): HttpError {
  return new HttpError(400, message || 'bad request');
}

export function forbidden(message?: string): HttpError {
  return new HttpError(403, message || 'forbidden');
}
