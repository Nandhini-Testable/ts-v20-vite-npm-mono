import { serviceFromA } from './circular_deps_a';

export function helperFromB(input: string): string {
  if (input.length === 0) {
    return 'empty';
  }
  return serviceFromA(input.slice(1));
}
