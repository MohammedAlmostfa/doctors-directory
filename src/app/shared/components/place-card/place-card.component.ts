import { Component, computed, inject, input } from '@angular/core';
import { PlaceBase } from '../../../core/models/place.model';
import { ClockService } from '../../../core/services/clock.service';
import { formatRange, getOpeningStatus, is24Hours } from '../../utils/working-hours';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

import { RouterLink } from '@angular/router';
// بالـ decorator:

// داخل الـ class:

@Component({
  selector: 'app-place-card',
  standalone: true,
imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './place-card.component.html',
})
export class PlaceCardComponent {
  place = input.required<PlaceBase>();
  icon = input.required<string>();   // اسم أيقونة Material: biotech / local_pharmacy / local_hospital
  tag = input<string>('');           // البادج تحت الاسم: 'سحب منزلي' / '24 ساعة' / نوع المركز
detailsLink = input<string | null>(null);   // مثلاً '/labs/3'
  private clock = inject(ClockService);

  status = computed(() => getOpeningStatus(this.place().ranges, this.clock.minutes()));
  hoursText = computed(() =>
    is24Hours(this.place().ranges) ? 'على مدار الساعة' : this.place().ranges.map(formatRange).join(' ، ')
  );
  telHref = computed(() => {
    const phone = this.place().phone;
    return phone ? 'tel:' + phone.replace(/\s/g, '') : null;
  });
  mapHref = computed(() => {
    const p = this.place();
    return 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(`${p.name} ${p.governorate} ${p.area}`);
  });
}
