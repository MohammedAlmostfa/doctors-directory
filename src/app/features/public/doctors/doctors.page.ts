import { Component, OnInit, computed, inject, input, signal } from '@angular/core';

import { SPECIALTIES } from '../../../core/constants/specialties';
import { DoctorsService } from '../../../core/services/doctors.service';

import {
  DirectoryFilters,
  DirectoryFiltersComponent,
  EMPTY_FILTERS,
  FilterSelect,
} from '../../../shared/components/directory-filters/directory-filters.component';

import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';

import { matchesQuery } from '../../../shared/utils/arabic-search';

@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    DoctorCardComponent,
    EmptyStateComponent,
    SkeletonCardsComponent,
  ],
  templateUrl: './doctors.page.html',
})
export class DoctorsPage implements OnInit {
  private readonly service = inject(DoctorsService);

  readonly loading = this.service.loading;
  readonly error = this.service.error;
  readonly doctors = this.service.doctors;

  readonly governorate = input<string>();
  readonly specialty = input<string>();

  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly specialtySelect: FilterSelect = {
    label: 'التخصص',
    allLabel: 'كل التخصصات',
    options: SPECIALTIES,
  };

  readonly results = computed(() => {
    const { q, governorate, category } = this.filters();

    return this.doctors().filter(doctor =>
      matchesQuery(q, doctor.name, doctor.specialty, doctor.area) &&
      (!governorate || doctor.governorate === governorate) &&
      (!category || doctor.specialty === category)
    );
  });

  ngOnInit(): void {
    this.filters.set({
      ...EMPTY_FILTERS,
      governorate: this.governorate() ?? '',
      category: this.specialty() ?? '',
    });

    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
