
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Pharmacy } from '../models/pharmacy.model';
import { PharmaciesApiResponse } from '../dto/pharmacy-api.dto';
import { mapPharmacies } from '../mappers/pharmacy.mapper';
import { environment } from '../../../environments/environment';

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
}
