import { PlaceBase } from './place.model';
import { WeeklySchedule } from '../constants/week-days';

export interface Pharmacy extends PlaceBase {
  schedule: WeeklySchedule;
}

export interface PharmacyFilters {
  q: string;
  city: string;
  openNow: boolean;
  open24: boolean;
}
