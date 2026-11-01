export const SPECIALTIES = [
  'الباطنية',
  'الأطفال',
  'النسائية والتوليد',
  'الجراحة العامة',
  'القلبية',
  'العظمية',
  'الجلدية',
  'العيون',
  'الأذن والأنف والحنجرة',
  'العصبية',
  'الأسنان',
  'المسالك البولية',
] as const;
export type Specialty = (typeof SPECIALTIES)[number];
