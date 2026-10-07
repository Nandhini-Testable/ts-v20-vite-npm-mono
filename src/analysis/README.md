# Planted analysis fixtures

TypeScript source files in this directory exist solely so white-box tools have
real patterns to analyse. They are **not** imported by the public API under
`src/index.ts`.

| File | Planted for |
| --- | --- |
| `complexity_sample.ts` | Lizard, sonarjs (cognitive complexity) |
| `lint_violations.ts` | eslint, biome |
| `sast_fixture.ts` | eslint-plugin-security |
| `dead_code.ts` | knip (unused exports) |
| `call_graph_sample.ts` | ts-morph (def/use chains) |
| `circular_deps_a.ts`, `circular_deps_b.ts` | dependency-cruiser |
