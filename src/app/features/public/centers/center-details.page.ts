import { Component, computed, inject, input } from '@angular/core';
import { MedicalCenter } from '../../../core/models/center.model';
import { CentersService } from '../../../core/services/centers.service';
import { everyDay } from '../../../core/utils/schedule';
import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';

const toDetails = (center: MedicalCenter): ListingDetails => ({
  name: center.name,
  icon: 'local_hospital',
  subtitle: { label: center.type, path: '/centers', query: { type: center.type } },
  location: {
    label: `${center.city} – ${center.area}`,
    path: '/centers',
    query: { city: center.city },
  },
  aboutTitle: 'نبذة عن المركز',
  about: center.about,
  chips: center.specialties,
  noun: 'المركز',
  city: center.city,
  area: center.area,
  address: center.address,
  phone: center.phone,
  mobile: center.mobile,
  whatsapp: center.whatsapp,
  email: center.email,
  schedule: everyDay(center.ranges),
});

@Component({
  selector: 'app-center-details-page',
  standalone: true,
  imports: [ListingDetailsComponent],
  template: `<app-listing-details [details]="details()" listPath="/centers" listLabel="المراكز الطبية" />`,
})
export class CenterDetailsPage {
  readonly id = input<string>();
  private readonly service = inject(CentersService);

  readonly details = computed(() => {
    const center = this.service.getById(Number(this.id()));
    return center ? toDetails(center) : null;
  });
}
