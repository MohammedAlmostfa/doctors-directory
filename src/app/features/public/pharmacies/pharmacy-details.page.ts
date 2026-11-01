import { Component, computed, inject, input } from '@angular/core';
import { Pharmacy } from '../../../core/models/pharmacy.model';
import { PharmaciesService } from '../../../core/services/pharmacies.service';
import { everyDay } from '../../../shared/utils/schedule';
import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';
import { is24Hours } from '../../../shared/utils/working-hours';

const toDetails = (pharmacy: Pharmacy): ListingDetails => ({
  name: pharmacy.name,
  icon: 'local_pharmacy',
  badges: is24Hours(pharmacy.ranges) ? ['24 ساعة'] : [],
  location: {
    label: `${pharmacy.city} – ${pharmacy.area}`,
    path: '/pharmacies',
    query: { city: pharmacy.city },
  },
  aboutTitle: 'نبذة عن الصيدلية',
  about: pharmacy.about,
  noun: 'الصيدلية',
  city: pharmacy.city,
  area: pharmacy.area,
  address: pharmacy.address,
  phone: pharmacy.phone,
  mobile: pharmacy.mobile,
  whatsapp: pharmacy.whatsapp,
  email: pharmacy.email,
  schedule: everyDay(pharmacy.ranges),
});

@Component({
  selector: 'app-pharmacy-details-page',
  standalone: true,
  imports: [ListingDetailsComponent],
  template: `<app-listing-details [details]="details()" listPath="/pharmacies" listLabel="الصيدليات" />`,
})
export class PharmacyDetailsPage {
  readonly id = input<string>();
  private readonly service = inject(PharmaciesService);

  readonly details = computed(() => {
    const pharmacy = this.service.getById(Number(this.id()));
    return pharmacy ? toDetails(pharmacy) : null;
  });
}
