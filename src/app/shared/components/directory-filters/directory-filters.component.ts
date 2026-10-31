import { Component, input, model } from '@angular/core';
import { CITIES } from '../../../core/constants/cities';

/** شكل الفلتر المشترك لكل صفحات الدليل */
export interface DirectoryFilters {
  q: string;
  city: string;
  category: string;    // نوع المركز / تخصص الطبيب ('' = الكل)
  openNow: boolean;
  flag: boolean;       // سحب منزلي (مخابر) / 24 ساعة (صيدليات)
}

export const EMPTY_FILTERS: DirectoryFilters = {
  q: '', city: '', category: '', openNow: false, flag: false,
};

/** وصف القائمة المنسدلة الإضافية */
export interface FilterSelect {
  label: string;                 // aria-label
  allLabel: string;              // نص خيار "الكل"
  options: readonly string[];
}

@Component({
  selector: 'app-directory-filters',
  standalone: true,
  templateUrl: './directory-filters.component.html',
})
export class DirectoryFiltersComponent {
  filters = model.required<DirectoryFilters>();

  label = input.required<string>();          // aria-label للفورم
  placeholder = input.required<string>();
  categorySelect = input<FilterSelect | null>(null);   // null = لا تعرض القائمة
  showOpenNow = input(true);
  flagLabel = input<string | null>(null);              // null = لا تعرض الشيب

  readonly cities = CITIES;

  patch(changes: Partial<DirectoryFilters>) {
    this.filters.update(f => ({ ...f, ...changes }));
  }
}
