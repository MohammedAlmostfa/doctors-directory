import { Component, computed, inject, input } from '@angular/core';
import { PlaceBase } from '../../../core/models/place.model';
import { WEEK_DAYS } from '../../../core/constants/week-days';
import { ClockService } from '../../../core/services/clock.service';
import { formatRange, getWeeklyStatus, isWeekly24Hours } from '../../utils/working-hours';
import { mapHref as createMapHref } from '../../utils/contact-links';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './place-card.component.html',
})
export class PlaceCardComponent {
  readonly place = input.required<PlaceBase>();
  readonly icon = input.required<string>();
  readonly tag = input<string>('');
  readonly detailsLink = input<string | null>(null);
  private readonly clock = inject(ClockService);

  readonly status = computed(() => {
    const { dow, minutes } = this.clock.now();
    return getWeeklyStatus(this.place().workingHours, dow, minutes);
  });
  readonly hoursText = computed(() => {
    const place = this.place();

    if (isWeekly24Hours(place.workingHours)) {
      return 'على مدار الساعة';
    }

    const today = WEEK_DAYS.find(day => day.dow === this.clock.now().dow);
    const ranges = today ? place.workingHours[today.key] : [];

    return ranges.length ? ranges.map(formatRange).join(' ، ') : 'مغلق';
  });
  readonly telHref = computed(() => {
    const phone = this.place().phone;
    return phone ? 'tel:' + phone.replace(/\s/g, '') : null;
  });
  readonly mapHref = computed(() => {
    const p = this.place();
    return createMapHref(`${p.name} ${p.governorate} ${p.area} ${p.address ?? ''}`);
  });
}
