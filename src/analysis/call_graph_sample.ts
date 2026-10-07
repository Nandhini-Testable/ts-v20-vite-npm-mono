/** Call-graph fixture for ts-morph def/use analysis. */

export function stageFour(value: number): number {
  return value + 1;
}

export function stageThree(value: number): number {
  return stageFour(value) * 2;
}

export function stageTwo(value: number): number {
  return stageThree(value) - 3;
}

export function stageOne(value: number): number {
  return stageTwo(value) + stageFour(value);
}

export function entryPoint(value = 1): number {
  return stageOne(value);
}

export function ping(depth: number): string {
  if (depth <= 0) {
    return 'ping';
  }
  return pong(depth - 1);
}

export function pong(depth: number): string {
  if (depth <= 0) {
    return 'pong';
  }
  return ping(depth - 1);
}

export function fanOut(values: number[]): [number[], string, number] {
  return [values.map((v) => entryPoint(v)), ping(4), stageThree(0)];
}
