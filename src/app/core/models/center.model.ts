import { CenterType } from '../constants/center-types';
import { PlaceBase } from './place.model';

export interface MedicalCenter extends PlaceBase {
  type: CenterType;
  specialties: string[];
}
export interface CenterFilters {
  q: string;
  city: string;
  type: CenterType | '';   // '' = كل الأنواع
  openNow: boolean;
}
