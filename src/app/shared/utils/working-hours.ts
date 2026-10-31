export interface OpeningStatus {
  open: boolean;
  note: string;
}
import { WEEK_DAYS, WeeklySchedule } from '../../core/constants/week-days';
const toMin = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export function formatMinutes(m: number): string {
  const clamped = ((m % (24 * 60)) + (24 * 60)) % (24 * 60);
  const h = Math.floor(clamped / 60) % 24;
  const mm = String(clamped % 60).padStart(2, '0');
  return `${h % 12 || 12}:${mm} ${h < 12 ? 'ص' : 'م'}`;
}

const parseRange = (range: string): [number, number] => {
  const [start, end] = range.split('-').map(part => part.trim());
  return [toMin(start), toMin(end)];
};

/** '07:00-19:00' → '7:00 ص – 7:00 م' */
export function formatRange(range: string): string {
  const [a, b] = parseRange(range);
  return `${formatMinutes(a)} – ${formatMinutes(b)}`;
}

/** نفس منطق السكربت الأصلي، لكن كدالة صافية (pure) سهلة الاختبار */
export function getOpeningStatus(ranges: string[], now: number): OpeningStatus {
  const parsed = ranges.map(parseRange);
const all24 = is24Hours(ranges);

  if (all24) {
    return { open: true, note: '' };
  }

  const current = parsed.find(([start, end]) => {
    if (start <= end) {
      return now >= start && now < end;
    }

    return now >= start || now < end;
  });

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
/** هل المكان مفتوح 24 ساعة؟ */
export function is24Hours(ranges: string[]): boolean {
  return ranges.length === 1 && ranges[0] === '00:00-24:00';
}
/** نفس منطق السكربت الأصلي: الحالة حسب اليوم + الدقيقة، مع "يفتح غداً / يفتح يوم X" */
export function getWeeklyStatus(schedule: WeeklySchedule, dow: number, now: number): OpeningStatus {
  const today = WEEK_DAYS.find(d => d.dow === dow)!;
  const ranges = schedule[today.key].map(r => r.split('-').map(toMin));

  const current = ranges.find(([a, b]) => now >= a && now < b);
if (current) {
  const fullDay = current[0] === 0 && current[1] === 24 * 60;
  return { open: true, note: fullDay ? '' : `حتى ${formatMinutes(current[1])}` };
}

  const later = ranges.find(([a]) => a > now);
  if (later) return { open: false, note: `يفتح اليوم ${formatMinutes(later[0])}` };

  // مغلق لباقي اليوم: دوّر على أقرب يوم فيه دوام (خلال 7 أيام)
  for (let i = 1; i <= 7; i++) {
    const day = WEEK_DAYS.find(d => d.dow === (dow + i) % 7)!;
    const first = schedule[day.key][0];
    if (first) {
      const when = i === 1 ? 'غداً' : `يوم ${day.label}`;
      return { open: false, note: `يفتح ${when} ${formatMinutes(toMin(first.split('-')[0]))}` };
    }
  }
  return { open: false, note: '' };
}
