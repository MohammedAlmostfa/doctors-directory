import { Component, computed, inject, input } from '@angular/core';
import { Lab } from '../../../core/models/lab.model';
import { LabsService } from '../../../core/services/labs.service';
import { everyDay } from '../../../shared/utils/schedule';
import { ListingDetailsComponent } from '../../../shared/components/listing-details/listing-details.component';
import { ListingDetails } from '../../../shared/components/listing-details/listing-details.model';

const toDetails = (lab: Lab): ListingDetails => ({
  name: lab.name,
  icon: 'biotech',
  badges: lab.homeVisit ? ['سحب منزلي'] : [],
  location: {
    label: `${lab.city} – ${lab.area}`,
    path: '/labs',
    query: { city: lab.city },
  },
  aboutTitle: 'نبذة عن المخبر',
  about: lab.about ?? undefined,
  noun: 'المخبر',
  city: lab.city,
  area: lab.area,
  address: lab.address ?? '',
  phone: lab.phone ?? '',
  mobile: lab.mobile ?? undefined,
  whatsapp: lab.whatsapp ?? undefined,
  email: lab.email ?? undefined,
  schedule: everyDay(lab.ranges),
});

@Component({
  selector: 'app-lab-details-page',
  standalone: true,
  imports: [ListingDetailsComponent],
  template: `<app-listing-details [details]="details()" listPath="/labs" listLabel="المخابر" />`,
})
export class LabDetailsPage {
  readonly id = input<string>();
  private readonly service = inject(LabsService);

  readonly details = computed(() => {
    const lab = this.service.getById(Number(this.id()));
    return lab ? toDetails(lab) : null;
  });
}
