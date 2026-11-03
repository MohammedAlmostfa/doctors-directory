
import { Component, OnInit, computed, inject, input } from '@angular/core';

import { Doctor } from '../../../core/models/doctor.model';
import { DoctorsService } from '../../../core/services/doctors.service';

import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';

import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';

import { initialsOf } from '../../../shared/utils/initials';

const toDetails = (doctor: Doctor): ListingDetails => ({
  name: doctor.name,
  initials: initialsOf(doctor.name),

  subtitle: {
    label: doctor.specialty,
    path: '/doctors',
    query: { specialty: doctor.specialty },
  },

  location: {
    label: `${doctor.governorate} – ${doctor.area}`,
    path: '/doctors',
    query: { governorate: doctor.governorate },
  },

  aboutTitle: 'نبذة عن الطبيب',
  about: doctor.about ?? undefined,
  chips: doctor.interests,

  noun: 'العيادة',
  governorate: doctor.governorate,
  area: doctor.area,
  address: doctor.address ?? '',

  phone: doctor.phone ?? '',
  mobile: doctor.mobile ?? undefined,
  whatsapp: doctor.whatsapp ?? undefined,
  email: doctor.email ?? undefined,

  workingHours: doctor.workingHours,
});

@Component({
  selector: 'app-doctor-details-page',
  standalone: true,
  imports: [
    ListingDetailsComponent,
    EmptyStateComponent,
    SkeletonCardsComponent,
  ],
  template: `
    @if (loading()) {
      <section class="container-page py-8">
        <app-skeleton-cards [count]="1" variant="doctor" />
      </section>
    } @else if (error()) {
      <section class="container-page py-8">
        <app-empty-state
          title="تعذر تحميل بيانات الطبيب"
          hint="تحقق من اتصالك بالإنترنت وحاول مجدداً." />

        <button type="button" (click)="retry()">
          إعادة المحاولة
        </button>
      </section>
    } @else if (details(); as doctorDetails) {
      <app-listing-details
        [details]="doctorDetails"
        listPath="/doctors"
        listLabel="الأطباء" />
    } @else {
      <section class="container-page py-8">
        <app-empty-state
          title="الطبيب غير موجود"
          hint="لم نتمكن من العثور على الطبيب المطلوب." />
      </section>
    }
  `,
})
export class DoctorDetailsPage implements OnInit {
  readonly id = input<string>();

  private readonly service = inject(DoctorsService);

  readonly loading = this.service.loading;
  readonly error = this.service.error;

  readonly details = computed(() => {
    const doctor = this.service.getById(Number(this.id()));

    return doctor ? toDetails(doctor) : null;
  });

  ngOnInit(): void {
    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
