import { Component, computed, input } from '@angular/core';

const MAX_SHOWN = 3;

@Component({
  selector: 'app-specialty-chips',
  standalone: true,
  template: `
    <div class="mt-4 flex flex-wrap gap-1.5">
      @for (s of shown(); track s) {
        <span class="chip !py-0.5 !text-xs">{{ s }}</span>
      }
      @if (extra() > 0) {
        <span class="chip !py-0.5 !text-xs">+{{ extra() }}</span>
      }
    </div>
  `,
})
export class SpecialtyChipsComponent {
  items = input.required<readonly string[]>();

  shown = computed(() => this.items().slice(0, MAX_SHOWN));
  extra = computed(() => Math.max(0, this.items().length - MAX_SHOWN));
}
