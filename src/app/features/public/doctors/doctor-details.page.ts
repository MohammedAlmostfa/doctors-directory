import { Component, computed, inject, input } from '@angular/core';
import { Doctor } from '../../../core/models/doctor.model';
import { DoctorsService } from '../../../core/services/doctors.service';
import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
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
    label: `${doctor.city} – ${doctor.area}`,
    path: '/doctors',
    query: { city: doctor.city },
  },
  aboutTitle: 'نبذة عن الطبيب',
  about: doctor.about,
  chips: doctor.interests,
  noun: 'العيادة',
  city: doctor.city,
  area: doctor.area,
  address: doctor.address,
  phone: doctor.phone,
  mobile: doctor.mobile,
  whatsapp: doctor.whatsapp,
  email: doctor.email,
  schedule: doctor.schedule,
});

@Component({
  selector: 'app-doctor-details-page',
  standalone: true,
  imports: [ListingDetailsComponent],
  template: `<app-listing-details [details]="details()" listPath="/doctors" listLabel="الأطباء" />`,
})
export class DoctorDetailsPage {
  readonly id = input<string>();
  private readonly service = inject(DoctorsService);

  readonly details = computed(() => {
    const doctor = this.service.getById(Number(this.id()));
    return doctor ? toDetails(doctor) : null;
  });
}
