import { Specialty } from '../constants/specialties';
import { WeeklySchedule } from '../constants/week-days';
import { ListingExtras } from './listing-extras.model';

export interface Doctor extends ListingExtras {
  id: number;
  name: string;               // 'د. ليلى الحلبي'
  specialty: Specialty;
  city: string;
  area: string;
  address: string;
  phone: string;              // هاتف العيادة
  experienceYears: number;
  schedule: WeeklySchedule;
  interests?: string[];       // خاص بالأطباء
}
export interface DoctorFilters {
  q: string;
  city: string;
  specialty: Specialty | '';   // '' = كل التخصصات
}
