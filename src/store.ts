export class MemoryStore<T = unknown> {
  private readonly _data: Map<string, T>;

  constructor() {
    this._data = new Map<string, T>();
  }

  put(id: string, value: T): T {
    this._data.set(id, value);
    return value;
  }

  get(id: string): T | undefined {
    return this._data.get(id);
  }

  list(): T[] {
    return Array.from(this._data.values());
  }
}
