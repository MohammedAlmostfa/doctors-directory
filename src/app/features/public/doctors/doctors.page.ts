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
import { matchesQuery } from '../../../shared/utils/arabic-search';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { simulateLoading } from '../../../core/utils/simulate-loading';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';

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
  private readonly all = this.service.getAll();
loading = simulateLoading();
  readonly city = input<string>();
  readonly specialty = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly specialtySelect: FilterSelect = {
    label: 'التخصص',
    allLabel: 'كل التخصصات',
    options: SPECIALTIES,
  };

  readonly results = computed(() => {
    const { q, city, category } = this.filters();

    return this.all.filter(doctor =>
      matchesQuery(q, doctor.name, doctor.specialty, doctor.area) &&
      (!city || doctor.city === city) &&
      (!category || doctor.specialty === category)
    );
  });

  ngOnInit(): void {
    this.filters.set({
      ...EMPTY_FILTERS,
      city: this.city() ?? '',
      category: this.specialty() ?? '',
    });
  }
}
