import { WorkingHoursDto } from '../dto/working-hours.dto';
import { WEEK_DAYS, WeeklySchedule } from '../constants/week-days';

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};

export function mapWorkingHours(
  workingHours: WorkingHoursDto[],
): WeeklySchedule {
  const schedule: WeeklySchedule = {
    sat: [],
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
  };

  for (const item of workingHours) {
    const day = WEEK_DAYS.find(({ dow }) => dow === item.day_of_week);
    if (!day) continue;

    schedule[day.key].push(
      `${formatTime(item.start_minute)}-${formatTime(item.end_minute)}`,
    );
  }

  return schedule;
}
