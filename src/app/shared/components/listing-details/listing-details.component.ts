import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClockService } from '../../../core/services/clock.service';
import { mapHref } from '../../utils/contact-links';
import { getWeeklyStatus } from '../../utils/working-hours';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ListingDetails } from './listing-details.model';
import { ContactCardComponent } from './parts/contact-card/contact-card.component';
import { ListingAboutComponent } from './parts/listing-about/listing-about.component';
import { ListingAddressComponent } from './parts/listing-address/listing-address.component';
import { ListingIdentityComponent } from './parts/listing-identity/listing-identity.component';
import { MobileCallBarComponent } from './parts/mobile-call-bar/mobile-call-bar.component';
import { WeeklyHoursComponent } from './parts/weekly-hours/weekly-hours.component';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    RouterLink, BreadcrumbComponent, EmptyStateComponent, ListingIdentityComponent, ListingAboutComponent,
    ListingAddressComponent, ContactCardComponent, WeeklyHoursComponent, MobileCallBarComponent,
  ],
  templateUrl: './listing-details.component.html',
})
export class ListingDetailsComponent {
  details = input.required<ListingDetails | null>();   // null = ما لقينا العنصر
  listPath = input.required<string>();                 // '/labs'
  listLabel = input.required<string>();                // 'المخابر'

  private clock = inject(ClockService);

  todayDow = computed(() => this.clock.now().dow);

  status = computed(() => {
    const d = this.details();
    const { dow, minutes } = this.clock.now();
    return d ? getWeeklyStatus(d.workingHours, dow, minutes) : { open: false, note: '' };
  });

  fullAddress = computed(() => {
    const d = this.details();
    return d ? `${d.governorate} – ${d.area}، ${d.address}` : '';
  });
  mapUrl = computed(() => mapHref(this.fullAddress()));

  crumbs = computed(() => [
    { label: 'الرئيسية', link: '/' },
    { label: this.listLabel(), link: this.listPath() },
    { label: this.details()?.name ?? '' },
  ]);
}
