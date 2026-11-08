import {
  Component,
  forwardRef,
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import {
  DayKey,
  WEEK_DAYS,
  WeeklySchedule,
} from '../../../../core/constants/week-days';

type PeriodPart = 'start' | 'end';

@Component({
  selector: 'app-form-schedule',
  standalone: true,
  templateUrl: './form-schedule.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormScheduleComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormScheduleComponent),
      multi: true,
    },
  ],
})
export class FormScheduleComponent
  implements ControlValueAccessor, Validator {

  readonly days = WEEK_DAYS;

  schedule: WeeklySchedule = this.createEmptySchedule();

  disabled = false;

  private onChange: (value: WeeklySchedule) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  private createEmptySchedule(): WeeklySchedule {
    return {
      sat: [],
      sun: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
    };
  }

  writeValue(value: WeeklySchedule | null): void {
    this.schedule = value
      ? this.normalizeSchedule(value)
      : this.createEmptySchedule();
  }

  registerOnChange(fn: (value: WeeklySchedule) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(_: AbstractControl): ValidationErrors | null {
    const hasInvalidPeriod = this.days.some(({ key }) =>
      this.schedule[key].some(period => !this.isValidPeriod(period))
    );

    return hasInvalidPeriod
      ? { invalidSchedule: true }
      : null;
  }

  private normalizeSchedule(value: WeeklySchedule): WeeklySchedule {
    const normalized = this.createEmptySchedule();

    for (const day of this.days) {
      normalized[day.key] = Array.isArray(value[day.key])
        ? [...value[day.key]]
        : [];
    }

    return normalized;
  }

  isDayEnabled(day: DayKey): boolean {
    return this.schedule[day].length > 0;
  }

  toggleDay(day: DayKey): void {
    if (this.disabled) return;

    this.schedule[day] = this.isDayEnabled(day)
      ? []
      : ['09:00-13:00'];

    this.commitChanges();
  }

  addPeriod(day: DayKey): void {
    if (this.disabled) return;

    this.schedule[day] = [
      ...this.schedule[day],
      '16:00-20:00',
    ];

    this.commitChanges();
  }

  removePeriod(day: DayKey, index: number): void {
    if (this.disabled) return;

    this.schedule[day] = this.schedule[day].filter(
      (_, currentIndex) => currentIndex !== index
    );

    this.commitChanges();
  }

  updatePeriod(
    day: DayKey,
    index: number,
    part: PeriodPart,
    value: string,
  ): void {
    if (this.disabled) return;

    const periods = [...this.schedule[day]];
    const currentPeriod = this.parsePeriod(periods[index]);

    if (part === 'start') {
      currentPeriod.start = value;
    } else {
      currentPeriod.end = value;
    }

    periods[index] = `${currentPeriod.start}-${currentPeriod.end}`;
    this.schedule[day] = periods;

    this.commitChanges();
  }

  getPeriodStart(period: string): string {
    return this.parsePeriod(period).start;
  }

  getPeriodEnd(period: string): string {
    return this.parsePeriod(period).end;
  }

  isInvalidPeriod(period: string): boolean {
    return !this.isValidPeriod(period);
  }

  applySaturdayToAll(): void {
    if (this.disabled) return;

    const saturdayPeriods = [...this.schedule.sat];

    for (const day of this.days) {
      if (day.key !== 'sat') {
        this.schedule[day.key] = [...saturdayPeriods];
      }
    }

    this.commitChanges();
  }

  private parsePeriod(period: string): {
    start: string;
    end: string;
  } {
    const [start = '', end = ''] = period.split('-');

    return { start, end };
  }

  private isValidPeriod(period: string): boolean {
    const { start, end } = this.parsePeriod(period);

    if (!this.isValidTime(start) || !this.isValidTime(end)) {
      return false;
    }

    return this.timeToMinutes(end) > this.timeToMinutes(start);
  }

  private isValidTime(value: string): boolean {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
  }

  private timeToMinutes(value: string): number {
    const [hours, minutes] = value.split(':').map(Number);

    return hours * 60 + minutes;
  }

  private commitChanges(): void {
    this.onChange({ ...this.schedule });
    this.onTouched();
    this.onValidatorChange();
  }
}
