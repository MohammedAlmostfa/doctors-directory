import { Component, OnInit, computed, inject, input } from '@angular/core';

import { Lab } from '../../../core/models/lab.model';
import { LabsService } from '../../../core/services/labs.service';

import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';
import { everyDay } from '../../../shared/utils/schedule';

const toDetails = (lab: Lab): ListingDetails => ({
  name: lab.name,
  icon: 'biotech',

  badges: lab.homeVisit ? ['سحب منزلي'] : [],

  location: {
    label: `${lab.governorate} – ${lab.area}`,
    path: '/labs',
    query: { governorate: lab.governorate },
  },

  aboutTitle: 'نبذة عن المخبر',
  about: lab.about ?? undefined,

  noun: 'المخبر',
  governorate: lab.governorate,
  area: lab.area,

  address: lab.address ?? '',
  phone: lab.phone ?? '',
  mobile: lab.mobile ?? undefined,
  whatsapp: lab.whatsapp ?? undefined,
  email: lab.email ?? undefined,

  workingHours: lab.workingHours ?? everyDay([]),
});

@Component({
  selector: 'app-lab-details-page',
  standalone: true,
  imports: [ListingDetailsComponent, SkeletonCardsComponent],
  template: `
    @if (loading()) {
      <div class="container mx-auto px-4 py-12">
        <app-skeleton-cards variant="place" />
      </div>
    } @else if (error()) {
      <div class="container mx-auto px-4 py-12 text-center">
        <p class="mb-4 text-red-600">{{ error() }}</p>

        <button
          type="button"
          (click)="retry()"
          class="rounded-lg bg-brand px-5 py-2 text-white"
        >
          إعادة المحاولة
        </button>
      </div>
    } @else if (details(); as labDetails) {
      <app-listing-details
        [details]="labDetails"
        listPath="/labs"
        listLabel="المخابر"
      />
    } @else if (loaded()) {
      <div class="container mx-auto px-4 py-12 text-center">
        <p>المخبر غير موجود.</p>
      </div>
    }
  `,
})
export class LabDetailsPage implements OnInit {
  readonly id = input<string>();

  private readonly service = inject(LabsService);

  readonly loading = this.service.loading;
  readonly error = this.service.error;
  readonly loaded = this.service.loaded;

  readonly details = computed(() => {
    const lab = this.service.getById(Number(this.id()));

    return lab ? toDetails(lab) : null;
  });

  ngOnInit(): void {
    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
