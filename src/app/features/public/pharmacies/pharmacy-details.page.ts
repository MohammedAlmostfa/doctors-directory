import { Component, OnInit, computed, inject, input } from '@angular/core';

import { Pharmacy } from '../../../core/models/pharmacy.model';
import { PharmaciesService } from '../../../core/services/pharmacies.service';

import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';

import { isWeekly24Hours } from '../../../core/utils/working-hours';

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
    EmptyStateComponent,
    SkeletonCardsComponent,
  ],
  template: `
    @if (loading()) {
      <section class="container-page py-8">
        <app-skeleton-cards [count]="1" variant="place" />
      </section>
    } @else if (error()) {
      <section class="container-page flex flex-col gap-4 py-8">
        <app-empty-state
          title="تعذر تحميل بيانات الصيدلية"
          [hint]="error() ?? 'تحقق من اتصالك بالإنترنت وحاول مجدداً.'" />

        <button type="button" class="btn-outline self-center" (click)="retry()">
          إعادة المحاولة
        </button>
      </section>
    } @else if (details(); as pharmacyDetails) {
      <app-listing-details
        [details]="pharmacyDetails"
        listPath="/pharmacies"
        listLabel="الصيدليات"
      />
    } @else if (loaded()) {
      <section class="container-page py-8">
        <app-empty-state
          title="الصيدلية غير موجودة"
          hint="لم نتمكن من العثور على الصيدلية المطلوبة." />
      </section>
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
