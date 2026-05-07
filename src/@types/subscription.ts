// types/subscription.ts
export interface Plan {
  _id: string;
  id?: string;
  name: string;
  planName?: string;
  price: number;
  popular?: boolean;
  modules?: {
    corePlatform?: boolean;
    aiLayer?: boolean;
    analytics?: boolean;
    automation?: boolean;
    integrations?: boolean;
    unlimitedLocation?: boolean;
  };
}

export interface App {
  _id: string;
  name: string;
  price: number;
  icon?: string;
}

export interface OrderPayload {
  planId: string;
  appIds: string[];
  validFor: number;
  discount: number;
  teamCount: number;
  teamCost: number;
}

export type ValidForType = 'month' | 'quarter' | '6month' | 'year';