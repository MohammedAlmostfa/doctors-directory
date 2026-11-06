import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef, input, output } from '@angular/core';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { SkeletonCardsComponent } from '../skeleton-cards/skeleton-cards.component';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';

export interface DirectoryResultsConfig {
  noun: string;
  note: string;
  errorTitle: string;
  errorHint: string;
  emptyTitle: string;
  emptyHint: string;
  skeletonVariant?: 'place' | 'doctor';
  skeletonChips?: boolean;
}

@Component({
  selector: 'app-directory-results',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    EmptyStateComponent,
    SkeletonCardsComponent,
    InfiniteScrollDirective,
  ],
  template: `
    @if (loading()) {
      <div class="flex h-5 items-center">
        <span class="skeleton-bar h-3.5 w-52"></span>
      </div>

      <app-skeleton-cards
        [count]="6"
        [variant]="config().skeletonVariant ?? 'place'"
        [chips]="config().skeletonChips ?? false" />
    } @else if (error()) {
      <app-empty-state
        [title]="config().errorTitle"
        [hint]="config().errorHint" />

      <button
        type="button"
        class="btn-outline self-center"
        (click)="retry.emit()">
        إعادة المحاولة
      </button>
    } @else {
      <p class="text-sm text-subtle">
        <b class="font-semibold text-ink">{{ resultCount() }} {{ config().noun }}</b>
        · {{ config().note }}
      </p>

      @if (resultCount()) {
        <div class="reveal grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ng-container [ngTemplateOutlet]="resultsTemplate ?? null" />
        </div>
      } @else {
        <app-empty-state
          [title]="config().emptyTitle"
          [hint]="config().emptyHint" />
      }

      @if (loadingMore()) {
        <app-skeleton-cards
          [count]="3"
          [variant]="config().skeletonVariant ?? 'place'"
          [chips]="config().skeletonChips ?? false" />
      }

      @if (loadMoreError()) {
        <div class="flex flex-col items-center gap-3 py-4">
          <p class="text-sm text-subtle">{{ loadMoreError() }}</p>

          <button
            type="button"
            class="btn-outline self-center"
            (click)="retry.emit()">
            إعادة المحاولة
          </button>
        </div>
      }

      @if (hasMore()) {
        <div
          appInfiniteScroll
          [disabled]="loadingMore() || !!loadMoreError()"
          (loadMore)="loadMore.emit()"
          class="h-2 w-full"
          aria-hidden="true">
        </div>
      }
    }
  `,
})
export class DirectoryResultsComponent {
  readonly config = input.required<DirectoryResultsConfig>();
  readonly loading = input.required<boolean>();
  readonly error = input.required<boolean>();
  readonly resultCount = input.required<number>();
  readonly loadingMore = input.required<boolean>();
  readonly loadMoreError = input.required<string | null>();
  readonly hasMore = input.required<boolean>();

  readonly retry = output<void>();
  readonly loadMore = output<void>();

  @ContentChild('cardContent', { read: TemplateRef })
  resultsTemplate?: TemplateRef<unknown>;
}
