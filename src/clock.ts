export class FixedClock {
  private readonly _date: Date;

  constructor(date: Date) {
    this._date = date;
  }

  now(): Date {
    return new Date(this._date.getTime());
  }
}

export const DATASET_CLOCK = new FixedClock(new Date('2026-03-15T12:00:00.000Z'));
