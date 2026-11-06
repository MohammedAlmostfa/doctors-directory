import { Component, OnInit, computed, inject, input } from '@angular/core';

import { MedicalCenter } from '../../../core/models/medical-center.model';
import { MedicalCentersService } from '../../../core/services/medical-centers.service';

import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
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
  imports: [ListingDetailsComponent, EmptyStateComponent, SkeletonCardsComponent],
  template: `
    @if (loading()) {
      <section class="container-page py-8">
        <app-skeleton-cards [count]="1" variant="place" />
      </section>
    } @else if (error()) {
      <section class="container-page flex flex-col gap-4 py-8">
        <app-empty-state
          title="تعذر تحميل بيانات المركز الطبي"
          [hint]="error() ?? 'تحقق من اتصالك بالإنترنت وحاول مجدداً.'" />

        <button
          type="button"
          (click)="retry()"
          class="btn-outline self-center">
          إعادة المحاولة
        </button>
      </section>
    } @else if (details(); as centerDetails) {
      <app-listing-details
        [details]="centerDetails"
        listPath="/centers"
        listLabel="المراكز الطبية"
      />
    } @else if (loaded()) {
      <section class="container-page py-8">
        <app-empty-state
          title="المركز الطبي غير موجود"
          hint="لم نتمكن من العثور على المركز الطبي المطلوب." />
      </section>
    }
  `,
})
export class CenterDetailsPage implements OnInit {
  readonly id = input<string>();

  private readonly service = inject(MedicalCentersService);

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
