import {
  Component,
  EventEmitter,
  Output,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormSectionComponent } from '../../../../../shared/components/form/form-section/form-section.component';
import { FormFieldComponent } from '../../../../../shared/components/form/form-field/form-field.component';
import { FormTextareaComponent } from '../../../../../shared/components/form/form-textarea/form-textarea.component';
import { FormPhotoUploaderComponent } from '../../../../../shared/components/form/form-photo-uploader/form-photo-uploader.component';
import { FormScheduleComponent } from '../../../../../shared/components/form/form-schedule/form-schedule.component';
import { FormActionsComponent } from '../../../../../shared/components/form/form-actions/form-actions.component';

import { WeeklySchedule } from '../../../../../core/constants/week-days';

export interface DoctorFormValue {
  name: string;
  governorate: string;
  area: string;
  address: string | null;
  mapUrl: string | null;
  phone: string | null;
  specialty: string;
  experienceYears: number | null;
  profileImage: File | string | null;
  workingHours: WeeklySchedule;
  interests: string[];
  about: string | null;
  mobile: string | null;
  whatsapp: string | null;
  email: string | null;
}

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormSectionComponent,
    FormFieldComponent,
    FormTextareaComponent,
    FormPhotoUploaderComponent,
    FormScheduleComponent,
    FormActionsComponent,
  ],
  templateUrl: './doctor-form.component.html',
})
export class DoctorFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly saving = signal(false);

  @Output() readonly submitted = new EventEmitter<DoctorFormValue>();

  readonly form = this.fb.group({
    name: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),

    specialty: this.fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),

    experienceYears: this.fb.control<number | null>(null, [
      Validators.min(0),
    ]),

    profileImage: this.fb.control<File | string | null>(null),

    governorate: this.fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),

    area: this.fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),

    address: this.fb.control(''),
    mapUrl: this.fb.control(''),

    phone: this.fb.control(''),
    mobile: this.fb.control(''),
    whatsapp: this.fb.control(''),

    email: this.fb.control('', [
      Validators.email,
    ]),

    about: this.fb.control(''),

    interests: this.fb.control('', { nonNullable: true }),

    workingHours: this.fb.control<WeeklySchedule>(
      {
        sat: [],
        sun: [],
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
      },
      { nonNullable: true },
    ),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const result: DoctorFormValue = {
      name: value.name.trim(),
      specialty: value.specialty.trim(),

      experienceYears: value.experienceYears,
      profileImage: value.profileImage,

      governorate: value.governorate.trim(),
      area: value.area.trim(),

      address: value.address?.trim() || null,
      mapUrl: value.mapUrl?.trim() || null,

      phone: value.phone?.trim() || null,
      mobile: value.mobile?.trim() || null,
      whatsapp: value.whatsapp?.trim() || null,

      email: value.email?.trim() || null,
      about: value.about?.trim() || null,

      interests: value.interests
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),

      workingHours: value.workingHours,
    };

    this.submitted.emit(result);
  }

  onCancel(): void {
    this.router.navigate(['/admin/doctors']);
  }
}
