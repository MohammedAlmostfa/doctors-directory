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

export interface FormSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'app-form-select',
  standalone: true,
  templateUrl: './form-select.component.html',
  imports: [FormErrorComponent],
})
export class FormSelectComponent implements ControlValueAccessor {
  label = input.required<string>();
  id = input.required<string>();
  options = input.required<FormSelectOption[]>();

  placeholder = input('اختر من القائمة');
  required = input(false);
  disabled = false;
  value: string | number | null = null;

  private onChange: (value: string | number | null) => void = () => {};
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
    this.value = value;
  }

  registerOnChange(
    fn: (value: string | number | null) => void,
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedOption = this.options().find(
      option => String(option.value) === target.value,
    );

    this.value = selectedOption?.value ?? null;
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
