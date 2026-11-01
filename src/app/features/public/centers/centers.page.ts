import { Component, OnInit, computed, inject, signal, input } from '@angular/core';
import { CENTER_TYPES } from '../../../core/constants/center-types';
import { CentersService } from '../../../core/services/centers.service';
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
import { matchesQuery } from '../../../shared/utils/arabic-search';
import { getOpeningStatus } from '../../../shared/utils/working-hours';
import { SpecialtyChipsComponent } from './components/specialty-chips/specialty-chips.component';
import { simulateLoading } from '../../../shared/utils/simulate-loading';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';



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
  private readonly all = this.service.getAll();
loading = simulateLoading();
  readonly city = input<string>();
  readonly type = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly typeSelect: FilterSelect = {
    label: 'نوع المركز',
    allLabel: 'كل الأنواع',
    options: CENTER_TYPES,
  };

  readonly results = computed(() => {
    const { q, city, category, openNow } = this.filters();
    const now = this.clock.minutes();

    return this.all.filter(center =>
      matchesQuery(q, center.name, center.area, ...center.specialties) &&
      (!city || center.city === city) &&
      (!category || center.type === category) &&
      (!openNow || getOpeningStatus(center.ranges, now).open)
    );
  });

  ngOnInit(): void {
    this.filters.set({
      ...EMPTY_FILTERS,
      city: this.city() ?? '',
      category: this.type() ?? '',
    });
  }
}
