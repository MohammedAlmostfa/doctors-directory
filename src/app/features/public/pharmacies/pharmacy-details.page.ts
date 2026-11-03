import { Component, OnInit, computed, inject, input } from '@angular/core';

import { Pharmacy } from '../../../core/models/pharmacy.model';
import { PharmaciesService } from '../../../core/services/pharmacies.service';

import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';

import { isWeekly24Hours } from '../../../shared/utils/working-hours';

const toDetails = (pharmacy: Pharmacy): ListingDetails => ({
  name: pharmacy.name,
  icon: 'local_pharmacy',
  badges: isWeekly24Hours(pharmacy.workingHours) ? ['24 ساعة'] : [],

  location: {
    label: `${pharmacy.governorate} – ${pharmacy.area}`,
    path: '/pharmacies',
    query: { governorate: pharmacy.governorate },
  },

  aboutTitle: 'نبذة عن الصيدلية',
  about: pharmacy.about ?? undefined,
  noun: 'الصيدلية',

  governorate: pharmacy.governorate,
  area: pharmacy.area,
  address: pharmacy.address ?? '',
  phone: pharmacy.phone ?? '',
  mobile: pharmacy.mobile ?? undefined,
  whatsapp: pharmacy.whatsapp ?? undefined,
  email: pharmacy.email ?? undefined,

  workingHours: pharmacy.workingHours,
});

@Component({
  selector: 'app-pharmacy-details-page',
  standalone: true,
  imports: [
    ListingDetailsComponent,
    SkeletonCardsComponent,
  ],
  template: `
    @if (loading()) {
      <app-skeleton-cards [count]="1" variant="place" />
    } @else if (error()) {
      <div class="text-center py-10">
        <p>{{ error() }}</p>
        <button type="button" (click)="retry()">إعادة المحاولة</button>
      </div>
    } @else if (details(); as pharmacyDetails) {
      <app-listing-details
        [details]="pharmacyDetails"
        listPath="/pharmacies"
        listLabel="الصيدليات"
      />
    } @else if (loaded()) {
      <p class="text-center py-10">لم يتم العثور على الصيدلية.</p>
    }
  `,
})
export class PharmacyDetailsPage implements OnInit {
  readonly id = input<string>();

  private readonly service = inject(PharmaciesService);

  readonly loading = this.service.loading;
  readonly error = this.service.error;
  readonly loaded = this.service.loaded;

  readonly details = computed(() => {
    const pharmacy = this.service.getById(Number(this.id()));

    return pharmacy ? toDetails(pharmacy) : null;
  });

  ngOnInit(): void {
    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
