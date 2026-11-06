
import { WeeklySchedule } from '../constants/week-days';

export interface Doctor {
  id: number;
  name: string;

  // بيانات الموقع
  governorate: string;
  area: string;
  address: string | null;
  mapUrl: string | null;

  // بيانات التواصل
  phone: string | null;

  // بيانات الطبيب
  specialty: string;
  experienceYears: number | null;
  profileImage: string | null;
  workingHours: WeeklySchedule;
  interests?: string[];

  about?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  email?: string | null;
}
