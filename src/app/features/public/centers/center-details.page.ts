import { Component, OnInit, computed, inject, input } from '@angular/core';

import { MedicalCenter } from '../../../core/models/medical-center.model';
import { CentersService } from '../../../core/services/medical-centers.service';

import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';

const toDetails = (center: MedicalCenter): ListingDetails => ({
  name: center.name,
  icon: 'local_hospital',

  subtitle: {
    label: center.type,
    path: '/centers',
    query: { type: center.type },
  },

  location: {
    label: `${center.governorate} – ${center.area}`,
    path: '/centers',
    query: { governorate: center.governorate },
  },

  aboutTitle: 'نبذة عن المركز',
  about: center.about ?? undefined,
  chips: center.specialties,

  noun: 'المركز',
  governorate: center.governorate,
  area: center.area,
  address: center.address ?? '',
  phone: center.phone ?? '',
  mobile: center.mobile ?? undefined,
  whatsapp: center.whatsapp ?? undefined,
  email: center.email ?? undefined,

  workingHours: center.workingHours,
});

@Component({
  selector: 'app-center-details-page',
  standalone: true,
  imports: [ListingDetailsComponent, SkeletonCardsComponent],
  template: `
    @if (loading()) {
      <div class="container mx-auto px-4 py-12">
        <app-skeleton-cards variant="place" />
      </div>
    } @else if (error()) {
      <div class="container mx-auto px-4 py-12 text-center">
        <p class="text-red-600 mb-4">{{ error() }}</p>
        <button
          type="button"
          (click)="retry()"
          class="rounded-lg bg-brand px-5 py-2 text-white"
        >
          إعادة المحاولة
        </button>
      </div>
    } @else if (details(); as centerDetails) {
      <app-listing-details
        [details]="centerDetails"
        listPath="/centers"
        listLabel="المراكز الطبية"
      />
    } @else if (loaded()) {
      <div class="container mx-auto px-4 py-12 text-center">
        <p>المركز الطبي غير موجود.</p>
      </div>
    }
  `,
})
export class CenterDetailsPage implements OnInit {
  readonly id = input<string>();

  private readonly service = inject(CentersService);

  readonly loading = this.service.loading;
  readonly error = this.service.error;
  readonly loaded = this.service.loaded;

  readonly details = computed(() => {
    const center = this.service.getById(Number(this.id()));

    return center ? toDetails(center) : null;
  });

  ngOnInit(): void {
    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
