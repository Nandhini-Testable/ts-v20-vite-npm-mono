import { createService, Service } from './service';
import { MemoryStore } from './store';
import type { ProductRecord } from './types';

export interface App {
  product: string;
  domain: string;
  service: Service;
}

export function createApp(): App {
  const store = new MemoryStore<ProductRecord>();
  const service = createService(store);
  return {
    product: 'GraniteMill',
    domain: 'Community garden plots',
    service,
  };
}
