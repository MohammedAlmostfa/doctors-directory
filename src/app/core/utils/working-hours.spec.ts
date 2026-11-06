import { describe, expect, it } from 'vitest';
import {
  formatRange,
  formatWeeklySchedule,
  getOpeningStatus,
  getWeeklyStatus,
  isWeekly24Hours,
} from './working-hours';
import { WeeklySchedule } from '../constants/week-days';

describe('working-hours', () => {
  it('formats hours correctly for AM/PM', () => {
    expect(formatRange('07:00-19:00')).toBe('7:00 ص – 7:00 م');
  });

  it('formats all days in a weekly schedule', () => {
    const schedule: WeeklySchedule = {
      sat: ['08:00-16:00'],
      sun: [],
      mon: ['00:00-24:00'],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
    };

    expect(formatWeeklySchedule(schedule)).toContain('السبت: 8:00 ص – 4:00 م');
    expect(formatWeeklySchedule(schedule)).toContain('الأحد: مغلق');
    expect(formatWeeklySchedule(schedule)).toContain('الاثنين: على مدار الساعة');
    expect(formatWeeklySchedule(schedule).split(' | ')).toHaveLength(7);
  });

  it('marks overnight ranges as open when current time falls inside them', () => {
    const status = getOpeningStatus(['21:00-03:00'], 22 * 60);

    expect(status.open).toBe(true);
    expect(status.note).toContain('حتى');
  });

  it('returns the next opening time when closed and no current range matches', () => {
    const status = getOpeningStatus(['07:00-19:00'], 20 * 60);

    expect(status.open).toBe(false);
    expect(status.note).toContain('غداً');
  });

  it('treats all-day ranges as open all the time', () => {
    const status = getOpeningStatus(['00:00-24:00'], 12 * 60);

    expect(status.open).toBe(true);
    expect(status.note).toBe('');
  });

  it('uses the requested weekday when calculating weekly status', () => {
    const schedule: WeeklySchedule = {
      sat: ['08:00-16:00'],
      sun: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
    };

    expect(getWeeklyStatus(schedule, 6, 9 * 60)).toMatchObject({
      open: true,
      note: 'حتى 4:00 م',
    });
    expect(getWeeklyStatus(schedule, 0, 9 * 60).open).toBe(false);
  });

  it('only considers a schedule 24-hour when every day is full-day', () => {
    const schedule: WeeklySchedule = {
      sat: ['00:00-24:00'],
      sun: ['00:00-24:00'],
      mon: ['00:00-24:00'],
      tue: ['00:00-24:00'],
      wed: ['00:00-24:00'],
      thu: ['00:00-24:00'],
      fri: ['00:00-24:00'],
    };

    expect(isWeekly24Hours(schedule)).toBe(true);
    expect(isWeekly24Hours({ ...schedule, fri: [] })).toBe(false);
  });
});
