import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="card py-14 text-center">
      <span class="icon text-[40px] text-subtle" aria-hidden="true">{{ icon() }}</span>
      <p class="font-semibold mt-2">{{ title() }}</p>
      <p class="text-sm text-muted mt-1">{{ hint() }}</p>
    </div>
  `,
})
export class EmptyStateComponent {
  icon = input('search_off');
  title = input.required<string>();
  hint = input('');
}
