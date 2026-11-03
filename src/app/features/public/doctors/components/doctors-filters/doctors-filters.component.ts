import { Component, model } from '@angular/core';
import { GOVERNORATES } from '../../../../../core/constants/governorates';
import { SPECIALTIES } from '../../../../../core/constants/specialties';
import { DoctorFilters } from '../../../../../core/models/doctor.model';

@Component({
  selector: 'app-doctors-filters',
  standalone: true,
  templateUrl: './doctors-filters.component.html',
})
export class DoctorsFiltersComponent {
  filters = model.required<DoctorFilters>();
  readonly governorates = GOVERNORATES;
  readonly specialties = SPECIALTIES;

  patch(changes: Partial<DoctorFilters>) {
    this.filters.update(f => ({ ...f, ...changes }));
  }
}
