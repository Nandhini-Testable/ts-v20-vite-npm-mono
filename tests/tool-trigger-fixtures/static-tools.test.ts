import assert from 'assert';
import { classifyPlot } from '../../src/analysis/complexity_sample';
import { entryPoint, ping } from '../../src/analysis/call_graph_sample';
import { serviceFromA } from '../../src/analysis/circular_deps_a';

describe('tool-trigger fixtures (executable smoke)', function () {
  it('exercises complexity fixture branches', function () {
    const result = classifyPlot('north', 'gold', 120, true, false, 6.5, 'FREEPLOT');
    assert.ok(result.band.length > 0);
  });

  it('exercises call-graph fixture', function () {
    assert.strictEqual(entryPoint(2) > 0, true);
    assert.strictEqual(ping(2), 'ping');
  });

  it('exercises circular dependency fixture', function () {
    assert.strictEqual(typeof serviceFromA('a'), 'string');
  });
});
