import { Component, computed, input } from '@angular/core';
import { WEEK_DAYS, WeeklySchedule } from '../../../../../core/constants/week-days';
import { formatRange, is24Hours } from '../../../../utils/working-hours';
@Component({
  selector: 'app-weekly-hours',
  standalone: true,
  template: `
    <section class="card p-6" aria-labelledby="hours-title">
      <h2 id="hours-title" class="flex items-center gap-2 text-lg font-semibold mb-3">
        <span class="icon text-brand" aria-hidden="true">schedule</span>ساعات الدوام الأسبوعية
      </h2>
      <ul class="divide-y divide-line/70">
        @for (r of rows(); track r.key) {
          <li class="flex items-start justify-between gap-3 py-2.5 px-3 rounded-md text-sm"
              [class]="r.isToday ? 'bg-brand-soft font-semibold' : ''">
            <span class="flex items-center gap-2 font-medium">{{ r.label }}
              @if (r.isToday) {
                <span class="text-[11px] leading-tight bg-brand text-white px-2 py-0.5 rounded-full">اليوم</span>
              }
            </span>
            <span class="text-end text-muted">
              @for (t of r.ranges; track t) {
                <bdi dir="ltr" class="block tabular-nums">{{ t }}</bdi>
              } @empty {
                <span class="text-subtle">مغلق</span>
              }
            </span>
          </li>
        }
      </ul>
      <p class="mt-3 pt-3 border-t border-line flex items-center gap-1.5 text-xs text-subtle">
        <span class="icon text-[16px]" aria-hidden="true">info</span>الحالة محسوبة حسب ساعات الدوام المسجلة بتوقيت دمشق.
      </p>
    </section>
  `,
})
export class WeeklyHoursComponent {
  schedule = input.required<WeeklySchedule>();
  todayDow = input.required<number>();

  rows = computed(() =>
    WEEK_DAYS.map(d => ({
      key: d.key,
      label: d.label,
      isToday: d.dow === this.todayDow(),
   // داخل rows (بدل السطر القديم)
ranges: this.schedule()[d.key].map(r => is24Hours([r]) ? 'على مدار الساعة' : formatRange(r)),
    }))
  );
}
