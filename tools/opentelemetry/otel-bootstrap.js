'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { trace } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor, InMemorySpanExporter } = require('@opentelemetry/sdk-trace-base');

const exporter = new InMemorySpanExporter();
const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});
trace.setGlobalTracerProvider(provider);

const reportsDir = path.join(__dirname, '../../reports');
const outFile = path.join(reportsDir, 'opentelemetry-spans.json');

function flushSpans() {
  const spans = exporter.getFinishedSpans().map((span) => ({
    name: span.name,
    traceId: span.spanContext().traceId,
    spanId: span.spanContext().spanId,
    attributes: span.attributes,
    status: span.status,
  }));

  if (spans.length === 0) {
    return;
  }

  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    outFile,
    JSON.stringify(
      {
        tracer: 'granite-mill',
        sdk: '@opentelemetry/sdk-node',
        spanCount: spans.length,
        spans,
      },
      null,
      2
    )
  );
}

process.on('beforeExit', flushSpans);
process.on('exit', flushSpans);

global.__otelExporter = exporter;
global.__otelFlushSpans = flushSpans;
