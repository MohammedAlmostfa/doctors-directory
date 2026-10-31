import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { PharmaciesService } from '../../../core/services/pharmacies.service';
import { ClockService } from '../../../core/services/clock.service';
import {
  DirectoryFilters,
  DirectoryFiltersComponent,
  EMPTY_FILTERS,
} from '../../../shared/components/directory-filters/directory-filters.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';
import { matchesQuery } from '../../../shared/utils/arabic-search';
import { getOpeningStatus, is24Hours } from '../../../shared/utils/working-hours';

@Component({
  selector: 'app-pharmacies-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    EmptyStateComponent,
  ],
  templateUrl: './pharmacies.page.html',
})
export class PharmaciesPage implements OnInit {
  private readonly service = inject(PharmaciesService);
  private readonly clock = inject(ClockService);
  private readonly all = this.service.getAll();

  readonly city = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly results = computed(() => {
    const { q, city, openNow, flag } = this.filters();
    const now = this.clock.minutes();

    return this.all.filter(pharmacy =>
      matchesQuery(q, pharmacy.name, pharmacy.area) &&
      (!city || pharmacy.city === city) &&
      (!openNow || getOpeningStatus(pharmacy.ranges, now).open) &&
      (!flag || is24Hours(pharmacy.ranges))
    );
  });

  is24(ranges: string[]): boolean {
    return is24Hours(ranges);
  }

  ngOnInit(): void {
    this.filters.set({ ...EMPTY_FILTERS, city: this.city() ?? '' });
  }
}
