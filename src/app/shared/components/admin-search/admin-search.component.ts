import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-admin-search',
  standalone: true,
  template: `
    <div class="rounded-2xl border border-line bg-white p-4">
      <label [for]="id()" class="field-label">
        {{ label() }}
      </label>

      <div class="relative mt-2">
        <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-subtle" aria-hidden="true">
          search
        </span>

        <input
          [id]="id()"
          type="search"
          class="field-input pr-11"
          [placeholder]="placeholder()"
          [value]="value()"
          (input)="onInput($event)" />
      </div>
    </div>
  `,
})
export class AdminSearchComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly value = input.required<string>();

  readonly valueChange = output<string>();

  onInput(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.valueChange.emit(target.value);
    }
  }
}
