import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MedicalCenter } from '../models/medical-center.model';
import { MedicalCentersApiResponse } from '../dto/medical-center-api.dto';
import { mapMedicalCenters } from '../mappers/medical-center.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CentersService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/medical-centers`;

  private readonly _centers = signal<MedicalCenter[]>([]);
  private readonly _loading = signal(false);
  private readonly _loaded = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly centers = this._centers.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    // منع تكرار الطلب إذا كانت البيانات محمّلة أو الطلب قيد التنفيذ
    if (this._loaded() || this._loading()) return;

    this._loading.set(true);
    this._error.set(null);

    this.http.get<MedicalCentersApiResponse>(this.endpoint).subscribe({
      next: response => {
        this._centers.set(mapMedicalCenters(response.data ?? []));
        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('تعذر تحميل المراكز الطبية. يرجى المحاولة مجدداً.');
        this._loading.set(false);
      },
    });
  }

  getAll(): MedicalCenter[] {
    return this._centers();
  }

  getById(id: number): MedicalCenter | undefined {
    return this._centers().find(center => center.id === id);
  }

  retry(): void {
    this.load();
  }
}
