import { PlaceBase } from './place.model';

// الصيدلية ما عندها حقول زيادة حالياً، فهي نفس PlaceBase
export type Pharmacy = PlaceBase;

export interface PharmacyFilters {
  q: string;
  city: string;
  openNow: boolean;
  open24: boolean;
}
