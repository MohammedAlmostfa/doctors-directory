
import { Injectable, computed, signal } from '@angular/core';

// شكل البيانات التي تمثل الوقت الحالي
export interface ClockNow {
  dow: number;       // رقم اليوم: الأحد 0، الاثنين 1...
  minutes: number;   // عدد الدقائق منذ بداية اليوم
}

// تحويل اختصار اليوم إلى رقمه
const WEEKDAYS: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

// إعدادات قراءة الوقت بتوقيت دمشق
const DAMASCUS_TIMEZONE = 'Asia/Damascus';

@Injectable({
  providedIn: 'root',
})
export class ClockService {

  // المسؤول عن استخراج اليوم والساعة والدقائق
  private readonly formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: DAMASCUS_TIMEZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  // الوقت الحالي، ويتم تحديثه كل دقيقة
  readonly now = signal<ClockNow>(this.read());

  // عدد الدقائق الحالية، للمحافظة على التوافق مع الكود القديم
  readonly minutes = computed(() => this.now().minutes);

  constructor() {
    setInterval(() => {
      this.now.set(this.read());
    }, 60_000);
  }

  // قراءة الوقت الحالي وتحويله إلى اليوم والدقائق
  private read(): ClockNow {
    const parts = this.formatter.formatToParts(new Date());

    const getPart = (type: string): string => {
      return parts.find(part => part.type === type)!.value;
    };

    const day = getPart('weekday');
    const hour = Number(getPart('hour'));
    const minute = Number(getPart('minute'));

    return {
      dow: WEEKDAYS[day],
      minutes: hour * 60 + minute,
    };
  }
}
