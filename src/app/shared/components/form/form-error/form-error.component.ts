import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getFormErrorMessage } from '../../../utils/form-errors';

@Component({
  selector: 'app-form-error',
  standalone: true,
  template: `
    @if (message(); as error) {
      <p [id]="id()" class="text-xs text-red-600" role="alert">
        {{ error }}
      </p>
    }
  `,
})
export class FormErrorComponent {
  control = input<AbstractControl | null>(null);
  id = input.required<string>();

  message = computed(() => {
    const control = this.control();

    if (!control?.invalid || !(control.touched || control.dirty)) {
      return null;
    }

    return getFormErrorMessage(control.errors);
  });
}
