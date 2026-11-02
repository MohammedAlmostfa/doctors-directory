import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Doctor } from '../models/doctor.model';
import { DoctorsApiResponse } from '../dto/doctor-api.dto';
import { mapDoctors } from '../mappers/doctor.mapper';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/doctors`;

  private readonly _doctors = signal<Doctor[]>([]);
  private readonly _loading = signal(false);
  private readonly _loaded = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly doctors = this._doctors.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    if (this._loaded() || this._loading()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.http.get<DoctorsApiResponse>(this.endpoint).subscribe({
      next: response => {
        this._doctors.set(mapDoctors(response.data));
        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('تعذر تحميل قائمة الأطباء.');
        this._loading.set(false);
      },
    });
  }

  getById(id: number): Doctor | undefined {
    return this._doctors().find(doctor => doctor.id === id);
  }

  retry(): void {
    this.load();
  }
}
