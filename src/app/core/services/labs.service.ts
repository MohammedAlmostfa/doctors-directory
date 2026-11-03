import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Lab } from '../models/lab.model';
import { LaboratoriesApiResponse } from '../dto/laboratory-api.dto';
import { mapLaboratories } from '../mappers/laboratory.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LabsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/laboratories`;

  private readonly _labs = signal<Lab[]>([]);
  private readonly _loading = signal(false);
  private readonly _loaded = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly labs = this._labs.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    if (this._loaded() || this._loading()) return;

    this._loading.set(true);
    this._error.set(null);

    this.http.get<LaboratoriesApiResponse>(this.endpoint).subscribe({
      next: response => {
        this._labs.set(mapLaboratories(response.data ?? []));
        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('تعذر تحميل المخابر. يرجى المحاولة مجدداً.');
        this._loading.set(false);
      },
    });
  }

  getAll(): Lab[] {
    return this._labs();
  }

  getById(id: number): Lab | undefined {
    return this._labs().find(lab => lab.id === id);
  }

  retry(): void {
    this.load();
  }
}
