export interface Ok<T> {
  ok: true;
  value: T;
}

export interface Err {
  ok: false;
  error: string;
}

export type Result<T> = Ok<T> | Err;

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function err(message: string): Err {
  return { ok: false, error: message };
}

export function mapResult<T, U>(result: Result<T>, fn: (value: T) => U): Result<U> {
  if (!result.ok) return result;
  return ok(fn(result.value));
}
