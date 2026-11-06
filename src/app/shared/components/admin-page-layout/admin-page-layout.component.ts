import { Component, input } from '@angular/core';

@Component({
  selector: 'app-admin-page-layout',
  standalone: true,
  template: `
    <section class="space-y-6">
      <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="font-heading text-2xl font-bold text-ink">
            {{ title() }}
          </h1>

          <p class="mt-1 text-sm text-muted">
            {{ description() }}
          </p>
        </div>

        <ng-content select="[admin-action]" />
      </header>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ng-content select="[admin-stat]" />
      </div>

      <ng-content select="[admin-filter]" />
      <ng-content select="[admin-error]" />
      <ng-content />
    </section>
  `,
})
export class AdminPageLayoutComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
