import { Component, OnInit, computed, inject, input, signal } from '@angular/core';

import { PharmaciesService } from '../../../core/services/pharmacies.service';
import { ClockService } from '../../../core/services/clock.service';
import { WeeklySchedule, WEEK_DAYS } from '../../../core/constants/week-days';

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
import { getWeeklyStatus } from '../../../shared/utils/working-hours';

function isWeekly24Hours(schedule: WeeklySchedule): boolean {
  return WEEK_DAYS.every(day => {
    const ranges = schedule[day.key];

    return ranges.length === 1 && ranges[0] === '00:00-24:00';
  });
}

@Component({
  selector: 'app-pharmacies-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    EmptyStateComponent,
    SkeletonCardsComponent,
  ],
  templateUrl: './pharmacies.page.html',
})
export class PharmaciesPage implements OnInit {
  private readonly service = inject(PharmaciesService);
  private readonly clock = inject(ClockService);

  readonly pharmacies = this.service.pharmacies;
  readonly loading = this.service.loading;
  readonly error = this.service.error;
  readonly loaded = this.service.loaded;

  readonly city = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly results = computed(() => {
    const { q, city, openNow, flag } = this.filters();
    const now = this.clock.minutes();
    const day = new Date().getDay();

    return this.pharmacies().filter(pharmacy => {
      const matchesFilters =
        matchesQuery(q, pharmacy.name, pharmacy.area) &&
        (!city || pharmacy.city === city);

      const openingStatus = getWeeklyStatus(
        pharmacy.schedule,
        day,
        now,
      );

      return (
        matchesFilters &&
        (!openNow || openingStatus.open) &&
        (!flag || isWeekly24Hours(pharmacy.schedule))
      );
    });
  });

  is24(schedule: WeeklySchedule): boolean {
    return isWeekly24Hours(schedule);
  }

  ngOnInit(): void {
    this.filters.set({
      ...EMPTY_FILTERS,
      city: this.city() ?? '',
    });

    this.service.load();
  }

  retry(): void {
    this.service.retry();
  }
}
