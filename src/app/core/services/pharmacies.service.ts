import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Pharmacy } from '../models/pharmacy.model';
import { PharmaciesApiResponse } from '../dto/pharmacy-api.dto';
import { mapPharmacies } from '../mappers/pharmacy.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PharmaciesService {
  private readonly http = inject(HttpClient);
  private readonly endpoint =  `${environment.apiUrl}/pharmacies`;

  private readonly _pharmacies = signal<Pharmacy[]>([]);
  private readonly _loading = signal(false);
  private readonly _loaded = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly pharmacies = this._pharmacies.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    if (this._loaded() || this._loading()) return;

    this._loading.set(true);
    this._error.set(null);

    this.http.get<PharmaciesApiResponse>(this.endpoint).subscribe({
      next: response => {
        this._pharmacies.set(mapPharmacies(response.data));
        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('تعذر تحميل قائمة الصيدليات.');
        this._loading.set(false);
      },
    });
  }

  getAll(): Pharmacy[] {
    return this._pharmacies();
  }

  getById(id: number): Pharmacy | undefined {
    return this._pharmacies().find(pharmacy => pharmacy.id === id);
  }

  retry(): void {
    this.load();
  }
}
