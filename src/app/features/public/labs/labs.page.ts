import { Component, OnInit, computed, inject, input, signal } from '@angular/core';

import { LabsService } from '../../../core/services/labs.service';
import { ClockService } from '../../../core/services/clock.service';

import {
  DirectoryFilters,
  DirectoryFiltersComponent,
  EMPTY_FILTERS,
} from '../../../shared/components/directory-filters/directory-filters.component';

import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';
import { SkeletonCardsComponent } from '../../../shared/components/skeleton-cards/skeleton-cards.component';

import { matchesQuery } from '../../../shared/utils/arabic-search';
import { everyDay } from '../../../shared/utils/schedule';
import { getWeeklyStatus } from '../../../shared/utils/working-hours';

@Component({
  selector: 'app-labs-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    EmptyStateComponent,
    SkeletonCardsComponent,
  ],
  templateUrl: './labs.page.html',
})
export class LabsPage implements OnInit {
  private readonly service = inject(LabsService);
  private readonly clock = inject(ClockService);

  readonly labs = this.service.labs;
  readonly loading = this.service.loading;
  readonly loaded = this.service.loaded;
  readonly error = this.service.error;

  readonly governorate = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly results = computed(() => {
    const { q, governorate, openNow, flag } = this.filters();

    const now = this.clock.minutes();
    const today = new Date().getDay();

    return this.labs().filter(lab =>
      matchesQuery(q, lab.name, lab.area) &&
      (!governorate || lab.governorate === governorate) &&
      (!openNow || getWeeklyStatus(lab.workingHours ?? everyDay([]), today, now).open) &&
      (!flag || lab.homeVisit)
    );
  });

  ngOnInit(): void {
    this.filters.set({
      ...EMPTY_FILTERS,
      governorate: this.governorate() ?? '',
    });

    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
