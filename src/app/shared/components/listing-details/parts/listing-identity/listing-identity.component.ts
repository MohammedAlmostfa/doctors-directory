import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OpeningStatus } from '../../../../utils/working-hours';
import { StatusBadgeComponent } from '../../../status-badge/status-badge.component';
import { ListingDetails } from '../../listing-details.model';

@Component({
  selector: 'app-listing-identity',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent],
  template: `
    <article class="card p-6 md:p-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="flex items-center gap-5">
          @if (details().icon) {
            <span class="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0" aria-hidden="true">
              <span class="icon text-[40px] md:text-[48px]">{{ details().icon }}</span>
            </span>
          } @else {
            <div class="avatar w-20 h-20 md:w-24 md:h-24 text-2xl md:text-3xl border border-line-strong font-heading" aria-hidden="true">{{ details().initials }}</div>
          }

          <div class="flex flex-col gap-1.5">
            <h1 class="text-2xl md:text-3xl font-bold">{{ details().name }}</h1>

            @if (details().subtitle; as s) {
              <a [routerLink]="s.path" [queryParams]="s.query" class="text-lg font-medium text-brand hover:text-brand-dark">{{ s.label }}</a>
            }

            @if (details().badges?.length) {
              <div class="flex flex-wrap items-center gap-2">
                @for (b of details().badges ?? []; track b) {
                  <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-soft text-brand text-xs font-semibold">{{ b }}</span>
                }
              </div>
            }

            <a [routerLink]="details().location.path" [queryParams]="details().location.query"
               class="flex items-center gap-1.5 text-sm text-subtle hover:text-brand">
              <span class="icon text-[18px]" aria-hidden="true">location_on</span>{{ details().location.label }}
            </a>
          </div>
        </div>

        <div class="sm:text-end pt-4 sm:pt-0 border-t sm:border-t-0 border-line" aria-live="polite">
          <app-status-badge [open]="status().open" [large]="true" />
          @if (status().note) {
            <p class="text-xs text-subtle mt-1.5">{{ status().note }}</p>
          }
        </div>
      </div>
    </article>
  `,
})
export class ListingIdentityComponent {
  details = input.required<ListingDetails>();
  status = input.required<OpeningStatus>();
}
