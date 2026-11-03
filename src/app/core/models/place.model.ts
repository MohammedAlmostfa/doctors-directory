import { WeeklySchedule } from '../constants/week-days';

export interface PlaceBase {
  id: number;
  name: string;
  governorate: string;
  area: string;
  address: string | null;
  phone: string | null;
  mapUrl?: string | null;
  workingHours: WeeklySchedule;
}
