import { CenterType } from '../constants/center-types';
import { PlaceBase } from './place.model';

export interface MedicalCenter extends PlaceBase {
  type: string;
  specialties: string[];
  about?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  email?: string | null;
}
export interface CenterFilters {
  q: string;
  governorate: string;
  type: CenterType | '';   // '' = كل الأنواع
  openNow: boolean;
}
