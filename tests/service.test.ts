import assert from 'assert';
import { createService } from '../src/service';
import { MemoryStore } from '../src/store';
import type { ProductRecord } from '../src/types';

describe('service', function () {
  it('creates and lists records', function () {
    const service = createService(new MemoryStore<ProductRecord>());
    const result = service.upsert({ title: 'Plot A' }, 'owner');
    assert.strictEqual(result.ok, true);
    assert.strictEqual(service.all().length, 1);
  });

  it('rejects viewer writes', function () {
    const service = createService(new MemoryStore<ProductRecord>());
    const result = service.upsert({ title: 'Plot B' }, 'viewer');
    assert.strictEqual(result.ok, false);
  });
});
