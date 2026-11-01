import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doctor } from '../../../../../core/models/doctor.model';
import { initialsOf } from '../../../../../shared/utils/initials';

// داخل الـ class:

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './doctor-card.component.html',
})
export class DoctorCardComponent {
  doctor = input.required<Doctor>();

  // 'د. أحمد الخطيب' → 'أخ' (نشيل "د." ونآخد أول حرف من أول كلمتين)
 initials = computed(() =>'');

  telHref = computed(() => 'tel:' + this.doctor().phone.replace(/\s/g, ''));
}
