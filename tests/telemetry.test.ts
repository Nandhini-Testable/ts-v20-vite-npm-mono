import assert from 'assert';
import { trace } from '@opentelemetry/api';
import { BasicTracerProvider, InMemorySpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { createService } from '../src/service';
import { MemoryStore } from '../src/store';
import type { ProductRecord } from '../src/types';

describe('telemetry (OpenTelemetry spans)', function () {
  const exporter = new InMemorySpanExporter();
  const provider = new BasicTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });

  // beforeEach/afterEach exist under both Mocha and Vitest (before/after do not).
  beforeEach(function () {
    trace.disable();
    trace.setGlobalTracerProvider(provider);
    exporter.reset();
  });

  afterEach(function () {
    trace.disable();
  });

  it('emits a span for every service call', function () {
    const service = createService(new MemoryStore<ProductRecord>());
    const created = service.upsert({ title: 'Plot C' }, 'owner');
    assert.strictEqual(created.ok, true);
    if (created.ok) service.move(created.value.id, 'published', 'owner');

    const names = exporter.getFinishedSpans().map((s) => s.name);
    assert.deepStrictEqual(names, ['service.upsert', 'service.move']);
  });

  it('records the role as a span attribute', function () {
    createService(new MemoryStore<ProductRecord>()).upsert({ title: 'Plot D' }, 'viewer');
    const [span] = exporter.getFinishedSpans();
    assert.ok(span);
    assert.strictEqual(span.attributes.role, 'viewer');
  });
});
