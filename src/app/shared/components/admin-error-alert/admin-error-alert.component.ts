import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-admin-error-alert',
  standalone: true,
  template: `
    <div class="rounded-xl border border-danger/20 bg-danger-soft p-4">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-danger">{{ message() }}</p>

        <button
          type="button"
          class="text-sm font-semibold text-danger underline"
          (click)="retry.emit()">
          إعادة المحاولة
        </button>
      </div>
    </div>
  `,
})
export class AdminErrorAlertComponent {
  readonly message = input.required<string>();
  readonly retry = output<void>();
}
