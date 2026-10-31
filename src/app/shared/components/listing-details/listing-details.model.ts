import { WeeklySchedule } from '../../../core/constants/week-days';

export interface ListingLink {
  label: string;
  path: string;                      // '/doctors'
  query?: Record<string, string>;    // { specialty: 'الأطفال' }
}

/** الشكل العام اللي بتفهمه صفحة التفاصيل، كل قسم بيحوّل موديله إلو */
export interface ListingDetails {
  // الهوية: إما icon (أماكن) أو initials (أطباء)
  name: string;
  icon?: string;
  initials?: string;
  subtitle?: ListingLink;      // التخصص / نوع المركز
  badges?: string[];           // سحب منزلي / 24 ساعة
  location: ListingLink;       // 'دمشق – المزة' (يفتح القائمة مفلترة بالمدينة)

  // المحتوى
  aboutTitle: string;
  about?: string;
  chips?: readonly string[];   // اهتمامات الطبيب / تخصصات المركز
  noun: string;                // العيادة / المخبر / الصيدلية / المركز

  // العنوان والتواصل
  city: string;
  area: string;
  address: string;
  phone: string;
  mobile?: string;
  whatsapp?: string;
  email?: string;

  schedule: WeeklySchedule;
}
