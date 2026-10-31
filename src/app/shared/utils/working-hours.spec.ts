import { describe, expect, it } from 'vitest';
import { formatRange, getOpeningStatus } from './working-hours';

describe('working-hours', () => {
  it('formats hours correctly for AM/PM', () => {
    expect(formatRange('07:00-19:00')).toBe('7:00 ص – 7:00 م');
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



});
