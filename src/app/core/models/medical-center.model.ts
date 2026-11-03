import { CenterType } from '../constants/center-types';

export interface MedicalCenter   {
  type: CenterType;
  specialties: string[];
    id: number;
  name: string;
  governorate: string;
  area: string;
  address: string | null;
  phone: string | null;
  mapUrl?: string | null;
  ranges: string[];


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
