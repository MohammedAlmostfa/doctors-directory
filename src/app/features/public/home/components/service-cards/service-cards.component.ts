import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  path: string;
  count: string;
}

@Component({
  selector: 'app-service-cards',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      @for (s of items(); track s.path) {
        <a [routerLink]="s.path" class="card card-hover p-6 flex flex-col gap-4 group">
          <span class="w-14 h-14 rounded-xl bg-brand-soft text-brand flex items-center justify-center transition-colors group-hover:bg-brand group-hover:text-white">
            <span class="icon text-[30px]" aria-hidden="true">{{ s.icon }}</span>
          </span>
          <div>
            <h3 class="font-heading text-xl font-semibold">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-muted leading-7">{{ s.description }}</p>
          </div>
          <div class="mt-auto pt-4 border-t border-line flex items-center justify-between">
            <span class="text-xs font-semibold text-subtle">{{ s.count }}</span>
            <span class="link-more">تصفّح<span class="icon text-[18px]" aria-hidden="true">arrow_back</span></span>
          </div>
        </a>
      }
    </div>
  `,
})
export class ServiceCardsComponent {
  items = input.required<ServiceItem[]>();
}
