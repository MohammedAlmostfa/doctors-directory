import { WEEK_DAYS, WeeklySchedule } from '../constants/week-days';

export interface OpeningStatus {
  open: boolean;
  note: string;
}

const toMin = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export function formatMinutes(minutes: number): string {
  const clamped = ((minutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const hours = Math.floor(clamped / 60) % 24;
  const remainingMinutes = String(clamped % 60).padStart(2, '0');
  return `${hours % 12 || 12}:${remainingMinutes} ${hours < 12 ? 'ص' : 'م'}`;
}

const parseRange = (range: string): [number, number] => {
  const [start, end] = range.split('-').map(part => part.trim());
  return [toMin(start), toMin(end)];
};

export function formatRange(range: string): string {
  const [start, end] = parseRange(range);
  return `${formatMinutes(start)} – ${formatMinutes(end)}`;
}

export function formatWeeklySchedule(schedule: WeeklySchedule): string {
  return WEEK_DAYS.map(({ key, label }) => {
    const ranges = schedule[key];
    const hours = ranges.length
      ? ranges.map(range => is24Hours([range]) ? 'على مدار الساعة' : formatRange(range)).join('، ')
      : 'مغلق';

    return `${label}: ${hours}`;
  }).join(' | ');
}

export function getOpeningStatus(ranges: string[], now: number): OpeningStatus {
  const parsed = ranges.map(parseRange);

  if (is24Hours(ranges)) {
    return { open: true, note: '' };
  }

  const current = parsed.find(([start, end]) =>
    start <= end ? now >= start && now < end : now >= start || now < end,
  );

  if (current) {
    return { open: true, note: `حتى ${formatMinutes(current[1])}` };
  }

  const starts = parsed.map(([start]) => start).sort((a, b) => a - b);
  const nextStart = starts.find(start => start > now) ?? starts[0];
  const nextText = nextStart !== undefined && nextStart > now ? 'يفتح اليوم' : 'يفتح غداً';

  return {
    open: false,
    note: `${nextText} ${formatMinutes(nextStart ?? 0)}`,
  };
}

export function is24Hours(ranges: string[]): boolean {
  return ranges.length === 1 && ranges[0] === '00:00-24:00';
}

export function getWeeklyStatus(
  schedule: WeeklySchedule,
  dow: number,
  now: number,
): OpeningStatus {
  const today = WEEK_DAYS.find(day => day.dow === dow)!;
  const ranges = schedule[today.key].map(range => range.split('-').map(toMin));

  const current = ranges.find(([start, end]) => now >= start && now < end);
  if (current) {
    const fullDay = current[0] === 0 && current[1] === 24 * 60;
    return { open: true, note: fullDay ? '' : `حتى ${formatMinutes(current[1])}` };
  }

  const later = ranges.find(([start]) => start > now);
  if (later) {
    return { open: false, note: `يفتح اليوم ${formatMinutes(later[0])}` };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = WEEK_DAYS.find(item => item.dow === (dow + offset) % 7)!;
    const first = schedule[day.key][0];
    if (first) {
      const when = offset === 1 ? 'غداً' : `يوم ${day.label}`;
      return {
        open: false,
        note: `يفتح ${when} ${formatMinutes(toMin(first.split('-')[0]))}`,
      };
    }
  }

  return { open: false, note: '' };
}

export function isWeekly24Hours(schedule: WeeklySchedule): boolean {
  return WEEK_DAYS.every(day => is24Hours(schedule[day.key]));
}
