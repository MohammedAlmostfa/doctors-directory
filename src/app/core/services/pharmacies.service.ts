
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Pharmacy } from '../models/pharmacy.model';
import { PharmaciesApiResponse } from '../dto/pharmacy-api.dto';
import { mapPharmacies } from '../mappers/pharmacy.mapper';
import { environment } from '../../../environments/environment';
import { PaginationMetaDto } from '../dto/pagination.dto';
@Injectable({ providedIn: 'root' })
export class PharmaciesService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/pharmacies`;

  private readonly _pharmacies = signal<Pharmacy[]>([]);

  private readonly _loading = signal(false);
  private readonly _loadingMore = signal(false);
  private readonly _loaded = signal(false);

  private readonly _error = signal<string | null>(null);
  private readonly _loadMoreError = signal<string | null>(null);

  private readonly _currentPage = signal(0);
  private readonly _lastPage = signal(1);

  readonly pharmacies = this._pharmacies.asReadonly();

  readonly loading = this._loading.asReadonly();
  readonly loadingMore = this._loadingMore.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  readonly error = this._error.asReadonly();
  readonly loadMoreError = this._loadMoreError.asReadonly();

// Admin pagination state
private readonly _adminPharmacies = signal<Pharmacy[]>([]);
private readonly _adminLoading = signal(false);
private readonly _adminError = signal<string | null>(null);
private readonly _adminPagination = signal<PaginationMetaDto | null>(null);

readonly adminPharmacies = this._adminPharmacies.asReadonly();
readonly adminLoading = this._adminLoading.asReadonly();
readonly adminError = this._adminError.asReadonly();
readonly adminPagination = this._adminPagination.asReadonly();

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

    this.http.get<PharmaciesApiResponse>(this.endpoint, { params }).subscribe({
      next: response => {
        this._pharmacies.set(mapPharmacies(response.data));

        this._currentPage.set(response.meta.current_page);
        this._lastPage.set(response.meta.last_page);

        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('تعذر تحميل قائمة الصيدليات.');
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

    this.http.get<PharmaciesApiResponse>(this.endpoint, { params }).subscribe({
      next: response => {
        this._pharmacies.update(current => [
          ...current,
          ...mapPharmacies(response.data),
        ]);

        this._currentPage.set(response.meta.current_page);
        this._lastPage.set(response.meta.last_page);

        this._loadingMore.set(false);
      },
      error: () => {
        this._loadMoreError.set('تعذر تحميل المزيد من الصيدليات.');
        this._loadingMore.set(false);
      },
    });
  }

  getAll(): Pharmacy[] {
    return this._pharmacies();
  }

  getById(id: number): Pharmacy | undefined {
    return this._pharmacies().find(pharmacy => pharmacy.id === id);
  }

  /** إعادة محاولة التحميل حسب المرحلة التي فشلت */
  retry(): void {
    if (!this._loaded()) {
      this.load();
      return;
    }

    this.loadMore();
  }

  /** تحميل صفحة محددة للأدمن */
loadAdminPage(page: number = 1): void {
  if (this._adminLoading()) {
    return;
  }

  this._adminLoading.set(true);
  this._adminError.set(null);

  const params = new HttpParams().set('page', page);

  this.http
    .get<PharmaciesApiResponse>(this.endpoint, { params })
    .subscribe({
      next: response => {
        this._adminPharmacies.set(mapPharmacies(response.data ?? []));
        this._adminPagination.set(response.meta);
        this._adminLoading.set(false);
      },
      error: () => {
        this._adminError.set('تعذر تحميل الصيدليات. يرجى المحاولة مجدداً.');
        this._adminLoading.set(false);
      },
    });
}
}
