/** Dead-code fixture — exports referenced by nothing in the package. */

export const RETIRED_RATE_TABLE = { legacy: 0.11, wholesale: 0.07 };

export function deprecatedRoundHalfUp(value: number, places = 2): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function unusedChannelMigration(channel: string): string {
  const mapping: Record<string, string> = { legacy: 'retail', wholesale: 'trade' };
  return mapping[channel] ?? channel;
}

export class AbandonedReportBuilder {
  private rows: unknown[] = [];

  add(row: unknown): this {
    this.rows.push(row);
    return this;
  }

  render(): string {
    return this.rows.map(String).join('\n');
  }
}

export function unreachableAfterReturn(value: number): number {
  return value * 2;
  return value * 3;
}
