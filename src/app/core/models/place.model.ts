import { ListingExtras } from './listing-extras.model';
import { WeeklySchedule } from '../constants/week-days';

/** الحقول المشتركة بين المخبر والصيدلية والمركز الطبي */
export interface PlaceBase extends ListingExtras {
  id: number;
  name: string;
  city: string;
  area: string;
  address: string | null;
  phone: string | null;
  mapUrl?: string | null;
  ranges: string[];
  schedule?: WeeklySchedule;
}
