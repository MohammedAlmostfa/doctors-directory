
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';

import { CENTER_TYPES } from '../../../core/constants/center-types';
import { CentersService } from '../../../core/services/medical-centers.service';
import { ClockService } from '../../../core/services/clock.service';

import {
  DirectoryFilters,
  DirectoryFiltersComponent,
  EMPTY_FILTERS,
  FilterSelect,
} from '../../../shared/components/directory-filters/directory-filters.component';

import {
  DirectoryResultsComponent,
  type DirectoryResultsConfig,
} from '../../../shared/components/directory-results/directory-results.component';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';
import { SpecialtyChipsComponent } from './components/specialty-chips/specialty-chips.component';

import { matchesQuery } from '../../../shared/utils/arabic-search';
import { getWeeklyStatus } from '../../../shared/utils/working-hours';

@Component({
  selector: 'app-centers-page',
  standalone: true,
  imports: [
    PageHeroComponent,
    DirectoryFiltersComponent,
    PlaceCardComponent,
    SpecialtyChipsComponent,
    DirectoryResultsComponent,
  ],
  templateUrl: './centers.page.html',
})
export class CentersPage implements OnInit {
  private readonly service = inject(CentersService);
  private readonly clock = inject(ClockService);

  readonly centers = this.service.centers;

  readonly loading = this.service.loading;
  readonly loadingMore = this.service.loadingMore;

  readonly error = this.service.error;
  readonly loadMoreError = this.service.loadMoreError;

  readonly hasMore = this.service.hasMore;

  readonly governorate = input<string>();
  readonly type = input<string>();

  readonly filters = signal<DirectoryFilters>({ ...EMPTY_FILTERS });

  readonly typeSelect: FilterSelect = {
    label: 'نوع المركز',
    allLabel: 'كل الأنواع',
    options: CENTER_TYPES,
  };

  readonly resultsConfig: DirectoryResultsConfig = {
    noun: 'مركز',
    note: 'ساعات الدوام قد تتغير، يُفضّل الاتصال قبل الزيارة.',
    errorTitle: 'تعذر تحميل المراكز الطبية',
    errorHint: 'تحقق من اتصالك بالإنترنت وحاول مجدداً.',
    emptyTitle: 'لا توجد مراكز مطابقة',
    emptyHint: 'غيّر كلمات البحث أو ألغِ التصفية.',
    skeletonChips: true,
  };

  readonly results = computed(() => {
    const { q, governorate, category, openNow } = this.filters();
    const { dow, minutes } = this.clock.now();

    return this.centers().filter(center =>
      matchesQuery(q, center.name, center.area, ...center.specialties) &&
      (!governorate || center.governorate === governorate) &&
      (!category || center.type === category) &&
      (!openNow || getWeeklyStatus(center.workingHours, dow, minutes).open)
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

  loadMore(): void {
    this.service.loadMore();
  }

  retry(): void {
    this.service.retry();
  }
}
