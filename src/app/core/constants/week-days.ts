// الأسبوع السوري بيبدأ من السبت. dow = رقم اليوم بالـ JavaScript (الأحد = 0 ... السبت = 6)
export const WEEK_DAYS = [
  { key: 'sat', label: 'السبت', dow: 6 },
  { key: 'sun', label: 'الأحد', dow: 0 },
  { key: 'mon', label: 'الاثنين', dow: 1 },
  { key: 'tue', label: 'الثلاثاء', dow: 2 },
  { key: 'wed', label: 'الأربعاء', dow: 3 },
  { key: 'thu', label: 'الخميس', dow: 4 },
  { key: 'fri', label: 'الجمعة', dow: 5 },
] as const;

export type DayKey = (typeof WEEK_DAYS)[number]['key'];

/** كل يوم → فترات الدوام. مصفوفة فاضية = مغلق */
export type WeeklySchedule = Record<DayKey, string[]>;
