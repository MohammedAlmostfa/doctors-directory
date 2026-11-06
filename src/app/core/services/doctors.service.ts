
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Doctor } from '../models/doctor.model';
import {
  DoctorsApiResponse,
  DoctorApiDto,
} from '../dto/doctor-api.dto';
import { PaginationMetaDto } from '../dto/pagination.dto';
import { mapDoctors } from '../mappers/doctor.mapper';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/doctors`;

  // =========================================================
  // Public Directory - Infinite Scroll
  // =========================================================

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

  /** تحميل الصفحة الأولى للدليل العام */
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

  /** تحميل الصفحة التالية للدليل العام */
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

  /** إعادة محاولة تحميل بيانات الدليل العام */
  retry(): void {
    if (!this._loaded()) {
      this.load();
      return;
    }

    this.loadMore();
  }

  // =========================================================
  // Admin - Server-side Pagination
  // =========================================================

  private readonly _adminDoctors = signal<DoctorApiDto[]>([]);
  private readonly _adminLoading = signal(false);
  private readonly _adminError = signal<string | null>(null);
  private readonly _adminPagination = signal<PaginationMetaDto | null>(null);

  readonly adminDoctors = this._adminDoctors.asReadonly();
  readonly adminLoading = this._adminLoading.asReadonly();
  readonly adminError = this._adminError.asReadonly();
  readonly adminPagination = this._adminPagination.asReadonly();

  readonly adminHasData = computed(
    () => this._adminDoctors().length > 0,
  );

  /** تحميل صفحة محددة في لوحة الإدارة */
  loadAdminPage(page = 1): void {
    if (this._adminLoading()) {
      return;
    }

    this._adminLoading.set(true);
    this._adminError.set(null);

    const params = new HttpParams().set('page', page);

    this.http.get<DoctorsApiResponse>(this.endpoint, { params }).subscribe({
      next: response => {
        this._adminDoctors.set(response.data);
        this._adminPagination.set(response.meta);
        this._adminLoading.set(false);
      },
      error: () => {
        this._adminError.set('تعذر تحميل بيانات الأطباء.');
        this._adminLoading.set(false);
      },
    });
  }
}
