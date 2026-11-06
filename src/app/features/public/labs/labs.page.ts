
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';

import { LabsService } from '../../../core/services/labs.service';
import { ClockService } from '../../../core/services/clock.service';

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
import { getWeeklyStatus } from '../../../shared/utils/working-hours';

@Component({
  selector: 'app-labs-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    DirectoryResultsComponent,
  ],
  templateUrl: './labs.page.html',
})
export class LabsPage implements OnInit {
  private readonly service = inject(LabsService);
  private readonly clock = inject(ClockService);

  readonly labs = this.service.labs;

  readonly loading = this.service.loading;
  readonly loadingMore = this.service.loadingMore;

  readonly error = this.service.error;
  readonly loadMoreError = this.service.loadMoreError;

  readonly hasMore = this.service.hasMore;

  readonly governorate = input<string>();
  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly resultsConfig: DirectoryResultsConfig = {
    noun: 'مخبر',
    note: 'ساعات الدوام قد تتغير، يُفضّل الاتصال قبل الزيارة.',
    errorTitle: 'تعذر تحميل المخابر',
    errorHint: 'تحقق من اتصالك بالإنترنت وحاول مجدداً.',
    emptyTitle: 'لا توجد مخابر مطابقة',
    emptyHint: 'غيّر كلمات البحث أو ألغِ التصفية.',
  };

  readonly results = computed(() => {
    const { q, governorate, openNow, flag } = this.filters();
    const { dow, minutes } = this.clock.now();

    return this.labs().filter(lab =>
      matchesQuery(q, lab.name, lab.area) &&
      (!governorate || lab.governorate === governorate) &&
      (!openNow || getWeeklyStatus(lab.workingHours, dow, minutes).open) &&
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

  loadMore(): void {
    this.service.loadMore();
  }

  retry(): void {
    this.service.retry();
  }
}
