import { Component, OnInit, computed, inject, input } from '@angular/core';

import { Lab } from '../../../core/models/lab.model';
import { LabsService } from '../../../core/services/labs.service';

import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';

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

  workingHours: lab.workingHours,
});

@Component({
  selector: 'app-lab-details-page',
  standalone: true,
  imports: [ListingDetailsComponent, EmptyStateComponent, SkeletonCardsComponent],
  template: `
    @if (loading()) {
      <section class="container-page py-8">
        <app-skeleton-cards [count]="1" variant="place" />
      </section>
    } @else if (error()) {
      <section class="container-page flex flex-col gap-4 py-8">
        <app-empty-state
          title="تعذر تحميل بيانات المخبر"
          [hint]="error() ?? 'تحقق من اتصالك بالإنترنت وحاول مجدداً.'" />

        <button
          type="button"
          (click)="retry()"
          class="btn-outline self-center">
          إعادة المحاولة
        </button>
      </section>
    } @else if (details(); as labDetails) {
      <app-listing-details
        [details]="labDetails"
        listPath="/labs"
        listLabel="المخابر"
      />
    } @else if (loaded()) {
      <section class="container-page py-8">
        <app-empty-state
          title="المخبر غير موجود"
          hint="لم نتمكن من العثور على المخبر المطلوب." />
      </section>
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
