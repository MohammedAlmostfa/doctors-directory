import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  input,
  signal,
  viewChild,
} from '@angular/core';

import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-form-photo-uploader',
  standalone: true,
  templateUrl: './form-photo-uploader.component.html',
  imports: [FormErrorComponent],
})
export class FormPhotoUploaderComponent
  implements ControlValueAccessor, OnDestroy
{
  label = input('الصورة الشخصية');
  id = input.required<string>();
  accept = input('image/jpeg,image/png,image/webp');
  maxSizeMb = input(2);
  hint = input('JPG أو PNG أو WebP، بحد أقصى 2MB');

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  previewUrl = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  disabled = signal(false);

  private value: File | null = null;
  private initialUrl: string | null = null;

  private onChange: (value: File | null) => void = () => {};
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

  writeValue(value: File | string | null): void {
    this.revokePreview();
    this.value = value instanceof File ? value : null;

    this.initialUrl = typeof value === 'string' ? value : null;

    this.previewUrl.set(
      this.initialUrl ??
      (value instanceof File ? URL.createObjectURL(value) : null),
    );

    this.errorMessage.set(null);
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  openFilePicker(): void {
    if (this.disabled()) return;

    this.fileInput()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (!file) return;

    this.errorMessage.set(null);

    if (!this.accept().split(',').includes(file.type)) {
      this.errorMessage.set('نوع الملف غير مدعوم');
      inputElement.value = '';
      this.onTouched();
      return;
    }

    const maxBytes = this.maxSizeMb() * 1024 * 1024;

    if (file.size > maxBytes) {
      this.errorMessage.set(
        `حجم الصورة يجب ألا يتجاوز ${this.maxSizeMb()}MB`,
      );

      inputElement.value = '';
      this.onTouched();
      return;
    }

    this.revokePreview();

    this.value = file;
    this.previewUrl.set(URL.createObjectURL(file));

    this.onChange(file);
    this.onTouched();

    inputElement.value = '';
  }

  removeImage(): void {
    if (this.disabled()) return;

    this.revokePreview();

    this.value = null;
    this.previewUrl.set(null);
    this.errorMessage.set(null);

    this.onChange(null);
    this.onTouched();
  }

  private revokePreview(): void {
    const currentUrl = this.previewUrl();

    if (currentUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(currentUrl);
    }
  }

  get invalid(): boolean {
    const control = this.ngControl?.control;
    return !!(
      control?.invalid &&
      (control.touched || control.dirty)
    );
  }
}
