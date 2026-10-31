import { Injectable, computed, signal } from '@angular/core';

export interface ClockNow {
  dow: number;       // اليوم (الأحد = 0)
  minutes: number;   // الدقيقة من بداية اليوم
}

const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** اليوم والدقيقة الحالية بتوقيت دمشق، وبتتحدّث كل دقيقة */
@Injectable({ providedIn: 'root' })
export class ClockService {
  private readonly fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Damascus', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });

  readonly now = signal<ClockNow>(this.read());
  // نفس الاسم القديم، فالمخابر والصيدليات والمراكز ما بتتأثر
  readonly minutes = computed(() => this.now().minutes);

  constructor() {
    setInterval(() => this.now.set(this.read()), 60_000);
  }

  private read(): ClockNow {
    const parts = this.fmt.formatToParts(new Date());
    const get = (type: string) => parts.find(p => p.type === type)!.value;
    return { dow: WEEKDAYS[get('weekday')], minutes: +get('hour') * 60 + +get('minute') };
  }
}
