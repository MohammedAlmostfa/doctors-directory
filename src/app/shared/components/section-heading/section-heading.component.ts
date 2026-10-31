import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-end justify-between gap-4 mb-8">
      <div>
        <h2 class="section-title">{{ title() }}</h2>
        @if (subtitle()) {
          <p class="text-muted mt-2 max-w-2xl">{{ subtitle() }}</p>
        }
      </div>
      @if (linkPath(); as path) {
        <a [routerLink]="path" class="link-more shrink-0">
          {{ linkLabel() }}<span class="icon text-[18px]" aria-hidden="true">arrow_back</span>
        </a>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  linkPath = input<string | null>(null);   // لو null ما بيظهر رابط "عرض الكل"
  linkLabel = input<string>('عرض الكل');
}
