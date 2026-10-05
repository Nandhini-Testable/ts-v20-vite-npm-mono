import { evaluatePolicy, canTransition } from './policy';
import { ok, err, Result } from './result';
import { toProductId } from './ids';
import { withSpan } from './telemetry';
import type { ProductRecord, Role, Status } from './types';

export interface RecordStore {
  put(id: string, value: ProductRecord): ProductRecord;
  get(id: string): ProductRecord | undefined;
  list(): ProductRecord[];
}

export interface Service {
  upsert(fields: Partial<ProductRecord>, role: Role): Result<ProductRecord>;
  move(id: string, toStatus: Status, role: Role): Result<ProductRecord>;
  all(): ProductRecord[];
}

export function createService(store: RecordStore): Service {
  let seq = 0;

  function upsert(fields: Partial<ProductRecord>, role: Role): Result<ProductRecord> {
    return withSpan('service.upsert', { role: String(role) }, () => upsertInner(fields, role));
  }

  function upsertInner(fields: Partial<ProductRecord>, role: Role): Result<ProductRecord> {
    const id = fields.id || toProductId(seq++);
    const record: ProductRecord = Object.assign({ id, status: 'draft' }, fields, { id });
    const decision = evaluatePolicy(record, role);
    if (!decision.allowed) return err(decision.reason);
    store.put(id, record);
    return ok(record);
  }

  function move(id: string, toStatus: Status, role: Role): Result<ProductRecord> {
    return withSpan('service.move', { id, toStatus: String(toStatus), role: String(role) }, () =>
      moveInner(id, toStatus, role)
    );
  }

  function moveInner(id: string, toStatus: Status, role: Role): Result<ProductRecord> {
    const record = store.get(id);
    if (!record) return err('not-found');
    const decision = evaluatePolicy(record, role);
    if (!decision.allowed) return err(decision.reason);
    if (!canTransition(record.status, toStatus)) return err('invalid-transition');
    const next: ProductRecord = Object.assign({}, record, { status: toStatus });
    store.put(id, next);
    return ok(next);
  }

  function all(): ProductRecord[] {
    return store.list();
  }

  return { upsert, move, all };
}
