/** High-complexity fixture for cyclomatic / cognitive complexity tools. */

export function classifyPlot(
  region: string,
  tier: string,
  areaSqM: number,
  irrigated: boolean,
  express: boolean,
  soilPh: number,
  promo?: string
): { band: string; fee: number; reason: string } {
  let band = 'unknown';
  let fee = 0;

  if (areaSqM <= 0) {
    return { band: 'invalid', fee: 0, reason: 'non-positive area' };
  }

  if (irrigated) {
    if (region === 'north') {
      if (areaSqM > 200) {
        band = 'north-large-irrigated';
        fee = 48;
      } else if (areaSqM > 50) {
        band = 'north-mid-irrigated';
        fee = 26;
      } else {
        band = 'north-small-irrigated';
        fee = 14;
      }
    } else if (region === 'south') {
      if (soilPh < 5.5) {
        band = 'south-acid-irrigated';
        fee = 55;
      } else if (areaSqM > 120) {
        band = 'south-large-irrigated';
        fee = 39;
      } else {
        band = 'south-std-irrigated';
        fee = 21;
      }
    } else {
      band = 'intl-irrigated';
      fee = 62;
    }
  } else if (express) {
    if (tier === 'gold') {
      fee = 9;
    } else if (tier === 'silver') {
      fee = 13;
    } else {
      fee = 18;
    }
    band = `express-${region}`;
  } else if (areaSqM > 300) {
    band = 'estate';
    fee = 34;
  } else if (areaSqM > 80) {
    band = 'standard-large';
    fee = 11;
  } else {
    band = 'standard';
    fee = 4.5;
  }

  if (soilPh > 8 && region !== 'south') {
    fee += 25;
  }
  if (promo && promo.toUpperCase() === 'FREEPLOT' && !irrigated) {
    fee = 0;
  }

  return { band, fee: Math.round(fee * 100) / 100, reason: 'classified' };
}
