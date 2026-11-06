
import { Component, computed, input, output } from '@angular/core';
import { PaginationMetaDto } from '../../../core/dto/pagination.dto';

@Component({
  selector: 'app-data-pagination',
  standalone: true,
  templateUrl: './data-pagination.component.html',
})
export class DataPaginationComponent {
  readonly meta = input.required<PaginationMetaDto>();
  readonly disabled = input(false);

  readonly pageChange = output<number>();

  readonly pages = computed(() => {
    const current = this.meta().current_page;
    const last = this.meta().last_page;

    const start = Math.max(1, current - 2);
    const end = Math.min(last, current + 2);

    return Array.from(
      { length: end - start + 1 },
      (_, index) => start + index,
    );
  });

  get canGoPrevious(): boolean {
    return this.meta().current_page > 1;
  }

  get canGoNext(): boolean {
    return this.meta().current_page < this.meta().last_page;
  }

  goToPage(page: number): void {
    if (
      this.disabled() ||
      page < 1 ||
      page > this.meta().last_page ||
      page === this.meta().current_page
    ) {
      return;
    }

    this.pageChange.emit(page);
  }

  previous(): void {
    this.goToPage(this.meta().current_page - 1);
  }

  next(): void {
    this.goToPage(this.meta().current_page + 1);
  }
}
