
import { WeeklySchedule } from '../constants/week-days';

export interface Pharmacy   {
  workingHours: WeeklySchedule;

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

export interface PharmacyFilters {
  q: string;
  governorate: string;
  openNow: boolean;
  open24: boolean;
}
