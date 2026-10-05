import { trace, Span, SpanStatusCode } from '@opentelemetry/api';

export const TRACER_NAME = 'granite-mill';

export function withSpan<T>(name: string, attributes: Record<string, string | number | boolean>, fn: () => T): T {
  const tracer = trace.getTracer(TRACER_NAME);
  return tracer.startActiveSpan(name, (span: Span) => {
    try {
      span.setAttributes(attributes);
      const value = fn();
      span.setStatus({ code: SpanStatusCode.OK });
      return value;
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
      throw error;
    } finally {
      span.end();
    }
  });
}
