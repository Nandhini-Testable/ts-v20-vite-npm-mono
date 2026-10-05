import assert from 'assert';
import fc from 'fast-check';
import { toProductId, isProductId } from '../src/ids';
import { canTransition } from '../src/policy';
import { sanitizeText } from '../src/sanitize';
import { tallyHours } from '../src/dataflow';

describe('property-based (fast-check)', function () {
  it('every non-negative integer maps to a valid product id', function () {
    fc.assert(
      fc.property(fc.nat({ max: 1_000_000 }), (n) => {
        assert.strictEqual(isProductId(toProductId(n)), true);
      })
    );
  });

  it('negative or fractional sequences are rejected', function () {
    fc.assert(
      fc.property(fc.oneof(fc.integer({ max: -1 }), fc.double({ noInteger: true, noNaN: true })), (n) => {
        assert.throws(() => toProductId(n), TypeError);
      })
    );
  });

  it('archived is terminal and nothing moves back to draft', function () {
    const status = fc.constantFrom('draft', 'published', 'archived', 'unknown');
    fc.assert(
      fc.property(status, (to) => {
        assert.strictEqual(canTransition('archived', to), false);
      })
    );
    fc.assert(
      fc.property(status, (from) => {
        assert.strictEqual(canTransition(from, 'draft'), false);
      })
    );
  });

  it('sanitizeText never returns angle brackets and caps length', function () {
    fc.assert(
      fc.property(fc.string(), (s) => {
        const out = sanitizeText(s);
        assert.ok(!/[<>]/.test(out));
        assert.ok(out.length <= 240);
      })
    );
  });

  it('tallyHours counts every record exactly once', function () {
    const rec = fc.record({ hours: fc.oneof(fc.integer({ min: -5, max: 24 }), fc.constant(Number.NaN)) });
    fc.assert(
      fc.property(fc.array(rec), fc.option(fc.integer({ min: 0, max: 24 }), { nil: undefined }), (rows, limit) => {
        const { bands } = tallyHours(rows, limit);
        assert.strictEqual(bands.low + bands.mid + bands.high + bands.invalid, rows.length);
      })
    );
  });
});
