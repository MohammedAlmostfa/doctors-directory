import { ListingExtras } from './listing-extras.model';

/** الحقول المشتركة بين المخبر والصيدلية والمركز الطبي */
export interface PlaceBase extends ListingExtras {
  id: number;
  name: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  ranges: string[];   // ['00:00-24:00'] = 24 ساعة
}
