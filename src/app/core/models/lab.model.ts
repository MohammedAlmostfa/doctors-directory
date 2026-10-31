import { PlaceBase } from './place.model';

export interface Lab extends PlaceBase {
  homeVisit: boolean;   // سحب منزلي
}
export interface LabFilters {
  q: string;
  city: string;
  openNow: boolean;
  homeVisit: boolean;
}
