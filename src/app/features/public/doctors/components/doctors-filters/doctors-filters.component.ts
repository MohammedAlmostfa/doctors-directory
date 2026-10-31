import { Component, model } from '@angular/core';
import { CITIES } from '../../../../../core/constants/cities';
import { SPECIALTIES } from '../../../../../core/constants/specialties';
import { DoctorFilters } from '../../../../../core/models/doctor.model';

@Component({
  selector: 'app-doctors-filters',
  standalone: true,
  templateUrl: './doctors-filters.component.html',
})
export class DoctorsFiltersComponent {
  filters = model.required<DoctorFilters>();
  readonly cities = CITIES;
  readonly specialties = SPECIALTIES;

  patch(changes: Partial<DoctorFilters>) {
    this.filters.update(f => ({ ...f, ...changes }));
  }
}
