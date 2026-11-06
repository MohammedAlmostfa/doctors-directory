
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';

import { PharmaciesService } from '../../../core/services/pharmacies.service';
import { ClockService } from '../../../core/services/clock.service';
import { WeeklySchedule } from '../../../core/constants/week-days';

import {
  DirectoryFilters,
  DirectoryFiltersComponent,
  EMPTY_FILTERS,
} from '../../../shared/components/directory-filters/directory-filters.component';

import {
  DirectoryResultsComponent,
  type DirectoryResultsConfig,
} from '../../../shared/components/directory-results/directory-results.component';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';

import { matchesQuery } from '../../../shared/utils/arabic-search';
import { getWeeklyStatus, isWeekly24Hours } from '../../../shared/utils/working-hours';

@Component({
  selector: 'app-pharmacies-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    DirectoryResultsComponent,
  ],
  templateUrl: './pharmacies.page.html',
})
export class PharmaciesPage implements OnInit {
  private readonly service = inject(PharmaciesService);
  private readonly clock = inject(ClockService);

  readonly pharmacies = this.service.pharmacies;

  readonly loading = this.service.loading;
  readonly loadingMore = this.service.loadingMore;

  readonly error = this.service.error;
  readonly loadMoreError = this.service.loadMoreError;

  readonly hasMore = this.service.hasMore;

  readonly governorate = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly resultsConfig: DirectoryResultsConfig = {
    noun: 'صيدلية',
    note: 'ساعات الدوام قد تتغير، يُفضّل الاتصال قبل الزيارة.',
    errorTitle: 'تعذر تحميل الصيدليات',
    errorHint: 'تحقق من اتصالك بالإنترنت وحاول مجدداً.',
    emptyTitle: 'لا توجد صيدليات مطابقة',
    emptyHint: 'غيّر كلمات البحث أو ألغِ التصفية.',
  };

  readonly results = computed(() => {
    const { q, governorate, openNow, flag } = this.filters();
    const { dow, minutes } = this.clock.now();

    return this.pharmacies().filter(pharmacy => {
      const matchesFilters =
        matchesQuery(q, pharmacy.name, pharmacy.area) &&
        (!governorate || pharmacy.governorate === governorate);

      const openingStatus = getWeeklyStatus(
        pharmacy.workingHours,
        dow,
        minutes,
      );

      return (
        matchesFilters &&
        (!openNow || openingStatus.open) &&
        (!flag || isWeekly24Hours(pharmacy.workingHours))
      );
    });
  });

  is24(schedule: WeeklySchedule): boolean {
    return isWeekly24Hours(schedule);
  }

  ngOnInit(): void {
    this.filters.set({
      ...EMPTY_FILTERS,
      governorate: this.governorate() ?? '',
    });

    this.service.load();
  }

  loadMore(): void {
    this.service.loadMore();
  }

  retry(): void {
    this.service.retry();
  }
}
