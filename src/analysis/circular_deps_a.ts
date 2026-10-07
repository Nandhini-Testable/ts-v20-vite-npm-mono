import { helperFromB } from './circular_deps_b';

export function serviceFromA(input: string): string {
  return helperFromB(input.toUpperCase());
}
