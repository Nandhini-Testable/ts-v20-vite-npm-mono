export interface HoursRecord {
  hours?: unknown;
}

export interface HourBands {
  low: number;
  mid: number;
  high: number;
  invalid: number;
}

export interface HoursTally {
  total: number;
  bands: HourBands;
}

export function tallyHours(records: Array<HoursRecord | null | undefined>, limit?: number): HoursTally {
  const bands: HourBands = { low: 0, mid: 0, high: 0, invalid: 0 };
  let total = 0;
  for (let i = 0; i < records.length; i += 1) {
    const hours = Number(records[i] && records[i]!.hours);
    if (Number.isNaN(hours) || hours < 0) {
      bands.invalid += 1;
      continue;
    }
    const capped = typeof limit === 'number' && hours > limit ? limit : hours;
    total += capped;
    if (capped < 4) bands.low += 1;
    else if (capped < 8) bands.mid += 1;
    else bands.high += 1;
  }
  return { total, bands };
}
