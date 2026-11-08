import {
  Component,
  input,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  imports: [FormErrorComponent],
})
export class FormFieldComponent implements ControlValueAccessor {
  label = input.required<string>();
  id = input.required<string>();

  type = input<
    'text' | 'number' | 'email' | 'tel' | 'url' | 'password'
  >('text');

  placeholder = input('');
  hint = input('');
  required = input(false);
  icon = input('');

  value: string | number = '';
  disabled = false;

  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string | number | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    const value =
      this.type() === 'number'
        ? target.value === ''
          ? ''
          : target.valueAsNumber
        : target.value;

    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  get invalid(): boolean {
    const control = this.ngControl?.control;
    return !!(
      control?.invalid &&
      (control.touched || control.dirty)
    );
  }
}
