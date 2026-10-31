
import { Component, computed, input } from '@angular/core';

/**
 * Skeleton cards matching the real place-card and doctor-card layouts.
 *
 * variant='place'  → Place Card
 * variant='doctor' → Doctor Card
 */
@Component({
  selector: 'app-skeleton-cards',
  standalone: true,
  template: `
    <div
      role="status"
      aria-busy="true"
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <span class="sr-only">جارٍ تحميل النتائج…</span>

      @for (i of items(); track i) {
        <div
          class="skeleton-card flex flex-col overflow-hidden p-5"
          aria-hidden="true"
          [style.--sweep-delay]="(i % 3) * 0.2 + 's'"
        >

          <!-- Header -->
          <div class="flex items-center gap-3.5">

            @if (variant() === 'doctor') {
              <span class="skeleton-bar h-14 w-14 shrink-0 rounded-xl"></span>
            } @else {
              <span class="skeleton-bar h-12 w-12 shrink-0 rounded-xl"></span>
            }

            <div class="min-w-0 flex-1">
              <span class="skeleton-bar block h-[25px] w-36 max-w-full rounded-md"></span>

              <span class="skeleton-bar mt-2 block h-5 w-24 rounded-md"></span>
            </div>

            @if (variant() === 'place') {
              <span class="skeleton-bar h-5 w-20 shrink-0 rounded-full"></span>
            }
          </div>

          <!-- Divider -->
          <div class="my-4 border-t border-line"></div>

          <!-- Information -->
          <ul class="space-y-4">

            <!-- Address -->
            <li class="flex items-start gap-3">
              <span class="skeleton-bar h-9 w-9 shrink-0 rounded-lg"></span>

              <div class="min-w-0 flex-1">
                <span class="skeleton-bar mb-2 block h-3 w-16 rounded"></span>
                <span class="skeleton-bar block h-4 w-4/5 rounded"></span>
              </div>
            </li>

            <!-- Working Hours / Experience -->
            <li class="flex items-start gap-3">
              <span class="skeleton-bar h-9 w-9 shrink-0 rounded-lg"></span>

              <div class="min-w-0 flex-1">
                <span class="skeleton-bar mb-2 block h-3 w-24 rounded"></span>

                <span class="skeleton-bar block h-4 w-2/5 rounded"></span>

                @if (variant() === 'place') {
                  <span class="skeleton-bar mt-1.5 block h-3 w-1/3 rounded"></span>
                }
              </div>
            </li>

            <!-- Phone -->
            <li class="flex items-start gap-3">
              <span class="skeleton-bar h-9 w-9 shrink-0 rounded-lg"></span>

              <div class="min-w-0 flex-1">
                <span class="skeleton-bar mb-2 block h-3 w-20 rounded"></span>
                <span class="skeleton-bar block h-4 w-28 rounded"></span>
              </div>
            </li>

          </ul>

          <!-- Optional Center Specialties -->
          @if (chips() && variant() === 'place') {
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span class="skeleton-bar h-[22px] w-16 rounded-md"></span>
              <span class="skeleton-bar h-[22px] w-20 rounded-md"></span>
              <span class="skeleton-bar h-[22px] w-14 rounded-md"></span>
            </div>
          }

          <!-- Actions -->
          <div class="mt-auto pt-5">
            <div class="flex items-center gap-2 border-t border-line pt-4">

              <span class="skeleton-bar h-11 flex-1 rounded-lg"></span>

              <span class="skeleton-bar h-11 flex-1 rounded-lg"></span>

              @if (variant() === 'place') {
                <span class="skeleton-bar h-11 w-11 shrink-0 rounded-lg"></span>
              }

            </div>
          </div>

        </div>
      }
    </div>
  `,
})
export class SkeletonCardsComponent {
  count = input(6);
  variant = input<'place' | 'doctor'>('place');
  chips = input(false);

  items = computed(() =>
    Array.from({ length: this.count() }, (_, i) => i)
  );
}
