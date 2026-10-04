export type Role = 'owner' | 'editor' | 'viewer' | string;
export type Status = 'draft' | 'published' | 'archived' | string;

export interface Decision {
  allowed: boolean;
  reason: string;
}

export interface ProductRecord {
  id: string;
  status: Status;
  [key: string]: unknown;
}
