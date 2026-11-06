import { Component, input } from '@angular/core';

@Component({
  selector: 'app-admin-stat-card',
  standalone: true,
  template: `
    <div class="rounded-2xl border border-line bg-white p-5">
      <p class="text-sm text-muted">{{ title() }}</p>

      <p class="mt-2 text-2xl font-bold text-ink">
        {{ value() }}
      </p>
    </div>
  `,
})
export class AdminStatCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
}
