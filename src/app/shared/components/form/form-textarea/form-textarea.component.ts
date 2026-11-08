import {
  Component,
  inject,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-form-textarea',
  standalone: true,
  templateUrl: './form-textarea.component.html',
  imports: [FormErrorComponent],
})
export class FormTextareaComponent implements ControlValueAccessor {
  label = input.required<string>();
  id = input.required<string>();

  placeholder = input('');
  hint = input('');
  required = input(false);
  rows = input(4);
  maxLength = input<number | null>(null);

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
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

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.onChange(this.value);
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
