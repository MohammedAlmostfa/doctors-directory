import { Component, OnInit, computed, inject, signal, input } from '@angular/core';

import { CENTER_TYPES } from '../../../core/constants/center-types';
import { CentersService } from '../../../core/services/medical-centers.service';
import { ClockService } from '../../../core/services/clock.service';

import {
  DirectoryFilters,
  DirectoryFiltersComponent,
  EMPTY_FILTERS,
  FilterSelect,
} from '../../../shared/components/directory-filters/directory-filters.component';

import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';
import { SpecialtyChipsComponent } from './components/specialty-chips/specialty-chips.component';

import { matchesQuery } from '../../../shared/utils/arabic-search';
import { everyDay } from '../../../shared/utils/schedule';
import { getWeeklyStatus } from '../../../shared/utils/working-hours';

@Component({
  selector: 'app-centers-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    SpecialtyChipsComponent,
    EmptyStateComponent,
    SkeletonCardsComponent,
  ],
  templateUrl: './centers.page.html',
})
export class CentersPage implements OnInit {
  private readonly service = inject(CentersService);
  private readonly clock = inject(ClockService);

  readonly centers = this.service.centers;
  readonly loading = this.service.loading;
  readonly loaded = this.service.loaded;
  readonly error = this.service.error;

  readonly governorate = input<string>();
  readonly type = input<string>();

  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly typeSelect: FilterSelect = {
    label: 'نوع المركز',
    allLabel: 'كل الأنواع',
    options: CENTER_TYPES,
  };

  readonly results = computed(() => {
    const { q, governorate, category, openNow } = this.filters();

    const now = this.clock.minutes();
    const today = new Date().getDay();

    return this.centers().filter(center =>
      matchesQuery(q, center.name, center.area, ...center.specialties) &&
      (!governorate || center.governorate === governorate) &&
      (!category || center.type === category) &&
      (!openNow || getWeeklyStatus(center.workingHours ?? everyDay([]), today, now).open)
    );
  });

  ngOnInit(): void {
    this.filters.set({
      ...EMPTY_FILTERS,
      governorate: this.governorate() ?? '',
      category: this.type() ?? '',
    });

    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
