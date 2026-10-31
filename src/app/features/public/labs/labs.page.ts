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
import { matchesQuery } from '../../../shared/utils/arabic-search';
import { getOpeningStatus } from '../../../shared/utils/working-hours';

@Component({
  selector: 'app-labs-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    EmptyStateComponent,
  ],
  templateUrl: './labs.page.html',
})
export class LabsPage implements OnInit {
  private readonly service = inject(LabsService);
  private readonly clock = inject(ClockService);
  private readonly all = this.service.getAll();

  readonly city = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly results = computed(() => {
    const { q, city, openNow, flag } = this.filters();
    const now = this.clock.minutes();

    return this.all.filter(lab =>
      matchesQuery(q, lab.name, lab.area) &&
      (!city || lab.city === city) &&
      (!openNow || getOpeningStatus(lab.ranges, now).open) &&
      (!flag || lab.homeVisit)
    );
  });

  ngOnInit(): void {
    this.filters.set({ ...EMPTY_FILTERS, city: this.city() ?? '' });
  }
}
