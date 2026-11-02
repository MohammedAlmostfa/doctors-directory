import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doctor } from '../../../../../core/models/doctor.model';
import { initialsOf } from '../../../../../shared/utils/initials';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './doctor-card.component.html',
})
export class DoctorCardComponent {
  doctor = input.required<Doctor>();

  initials = computed(() => initialsOf(this.doctor().name));

  telHref = computed(() => {
    const phone = this.doctor().phone;
    return phone ? 'tel:' + phone.replace(/\s/g, '') : null;
  });
}
