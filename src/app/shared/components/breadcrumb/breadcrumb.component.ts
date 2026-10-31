import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  link?: string;   // آخر عنصر (الصفحة الحالية) بدون رابط
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
      <nav aria-label="مسار التنقل" class="flex items-center gap-1.5 text-subtle flex-wrap">
        @for (item of items(); track item.label; let last = $last) {
          @if (last) {
            <span aria-current="page" class="text-ink font-medium">{{ item.label }}</span>
          } @else {
            <a [routerLink]="item.link" class="hover:text-brand">{{ item.label }}</a>
            <span class="icon text-[16px]" aria-hidden="true">chevron_left</span>
          }
        }
      </nav>
      <a [routerLink]="backLink()" class="link-more">
        <span class="icon text-[18px]" aria-hidden="true">arrow_forward</span>{{ backLabel() }}
      </a>
    </div>
  `,
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();
  backLink = input.required<string>();
  backLabel = input.required<string>();
}
