
import { Component, OnInit, computed, effect, inject, input, signal } from '@angular/core';

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
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';

import { InfiniteScrollDirective } from '../../../shared/directives/infinite-scroll.directive';
import { matchesQuery } from '../../../shared/utils/arabic-search';

@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    EmptyStateComponent,
    SkeletonCardsComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './doctors.page.html',
})
export class DoctorsPage implements OnInit {
  private readonly service = inject(DoctorsService);

  readonly loading = this.service.loading;
  readonly loadingMore = this.service.loadingMore;

  readonly error = this.service.error;
  readonly loadMoreError = this.service.loadMoreError;

  readonly hasMore = this.service.hasMore;

  readonly doctors = this.service.doctors;

  readonly governorate = input<string>();
  readonly q = input<string>();
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

  constructor() {
    effect(() => {
      const q = this.q() ?? '';
      const governorate = this.governorate() ?? '';
      const category = this.specialty() ?? '';

      this.filters.update(filters => ({ ...filters, q, governorate, category }));
    });
  }

  ngOnInit(): void {
    this.service.load();
  }

  loadMore(): void {
    this.service.loadMore();
  }

  retry(): void {
    this.service.retry();
  }
}
