import { WeeklySchedule } from '../constants/week-days';

/** نفس الدوام كل أيام الأسبوع (نستخدمها لتحويل ranges الأماكن) */
export const everyDay = (ranges: string[]): WeeklySchedule => ({
  sat: ranges, sun: ranges, mon: ranges, tue: ranges, wed: ranges, thu: ranges, fri: ranges,
});

/** من السبت للخميس، والجمعة مغلق */
export const sixDays = (ranges: string[]): WeeklySchedule => ({
  sat: ranges, sun: ranges, mon: ranges, tue: ranges, wed: ranges, thu: ranges, fri: [],
});
