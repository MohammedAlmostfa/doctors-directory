
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

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
  private readonly _loadingMore = signal(false);
  private readonly _loaded = signal(false);

  private readonly _error = signal<string | null>(null);
  private readonly _loadMoreError = signal<string | null>(null);

  private readonly _currentPage = signal(0);
  private readonly _lastPage = signal(1);

  readonly doctors = this._doctors.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loadingMore = this._loadingMore.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  readonly error = this._error.asReadonly();
  readonly loadMoreError = this._loadMoreError.asReadonly();

  readonly hasMore = computed(
    () => this._currentPage() < this._lastPage(),
  );

  /** تحميل الصفحة الأولى */
  load(): void {
    if (this._loaded() || this._loading()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    const params = new HttpParams().set('page', 1);

    this.http.get<DoctorsApiResponse>(this.endpoint, { params }).subscribe({
      next: response => {
        this._doctors.set(mapDoctors(response.data));

        this._currentPage.set(response.meta.current_page);
        this._lastPage.set(response.meta.last_page);

        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('تعذر تحميل قائمة الأطباء.');
        this._loading.set(false);
      },
    });
  }

  /** تحميل الصفحة التالية */
  loadMore(): void {
    if (
      !this._loaded() ||
      this._loading() ||
      this._loadingMore() ||
      !this.hasMore()
    ) {
      return;
    }

    const nextPage = this._currentPage() + 1;

    this._loadingMore.set(true);
    this._loadMoreError.set(null);

    const params = new HttpParams().set('page', nextPage);

    this.http.get<DoctorsApiResponse>(this.endpoint, { params }).subscribe({
      next: response => {
        this._doctors.update(current => [
          ...current,
          ...mapDoctors(response.data),
        ]);

        this._currentPage.set(response.meta.current_page);
        this._lastPage.set(response.meta.last_page);

        this._loadingMore.set(false);
      },
      error: () => {
        this._loadMoreError.set('تعذر تحميل المزيد من الأطباء.');
        this._loadingMore.set(false);
      },
    });
  }

  getById(id: number): Doctor | undefined {
    return this._doctors().find(doctor => doctor.id === id);
  }

  /** إعادة محاولة التحميل حسب المرحلة التي فشلت */
  retry(): void {
    if (!this._loaded()) {
      this.load();
      return;
    }

    this.loadMore();
  }
}
