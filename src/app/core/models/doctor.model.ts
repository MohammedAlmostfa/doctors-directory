import { ListingExtras } from './listing-extras.model';
import { WeeklySchedule } from '../constants/week-days';


export interface Doctor extends ListingExtras {
  id: number;
  name: string;

  // بيانات الموقع
  city: string;
  area: string;
  address: string | null;
  mapUrl: string | null;

  // بيانات التواصل
  phone: string | null;

  // بيانات الطبيب
  specialty: string;
  experienceYears: number | null;
  profileImage: string | null;

schedule?: WeeklySchedule;
  interests?: string[];
}

export interface DoctorFilters {
  q: string;
  city: string;
  specialty: string;
}
