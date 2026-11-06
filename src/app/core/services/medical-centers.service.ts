
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { MedicalCenter } from '../models/medical-center.model';
import { MedicalCentersApiResponse } from '../dto/medical-center-api.dto';
import { mapMedicalCenters } from '../mappers/medical-center.mapper';
import { environment } from '../../../environments/environment';
import { PaginationMetaDto } from '../dto/pagination.dto';
@Injectable({ providedIn: 'root' })
export class MedicalCentersService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/medical-centers`;

  private readonly _centers = signal<MedicalCenter[]>([]);

  private readonly _loading = signal(false);
  private readonly _loadingMore = signal(false);
  private readonly _loaded = signal(false);

  private readonly _error = signal<string | null>(null);
  private readonly _loadMoreError = signal<string | null>(null);

  private readonly _currentPage = signal(0);
  private readonly _lastPage = signal(1);

  readonly centers = this._centers.asReadonly();

  readonly loading = this._loading.asReadonly();
  readonly loadingMore = this._loadingMore.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  readonly error = this._error.asReadonly();
  readonly loadMoreError = this._loadMoreError.asReadonly();
// Admin pagination
private readonly _adminCenters = signal<MedicalCenter[]>([]);
private readonly _adminLoading = signal(false);
private readonly _adminError = signal<string | null>(null);
private readonly _adminPagination = signal<PaginationMetaDto | null>(null);

readonly adminCenters = this._adminCenters.asReadonly();
readonly adminLoading = this._adminLoading.asReadonly();
readonly adminError = this._adminError.asReadonly();
readonly adminPagination = this._adminPagination.asReadonly();
  readonly hasMore = computed(
    () => this._currentPage() < this._lastPage(),
  );

  load(): void {
    if (this._loaded() || this._loading()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    const params = new HttpParams().set('page', 1);

    this.http.get<MedicalCentersApiResponse>(this.endpoint, { params }).subscribe({
      next: response => {
        this._centers.set(mapMedicalCenters(response.data ?? []));

        this._currentPage.set(response.meta.current_page);
        this._lastPage.set(response.meta.last_page);

        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('تعذر تحميل المراكز الطبية. يرجى المحاولة مجدداً.');
        this._loading.set(false);
      },
    });
  }

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

    this.http.get<MedicalCentersApiResponse>(this.endpoint, { params }).subscribe({
      next: response => {
        this._centers.update(current => [
          ...current,
          ...mapMedicalCenters(response.data ?? []),
        ]);

        this._currentPage.set(response.meta.current_page);
        this._lastPage.set(response.meta.last_page);

        this._loadingMore.set(false);
      },
      error: () => {
        this._loadMoreError.set('تعذر تحميل المزيد من المراكز الطبية.');
        this._loadingMore.set(false);
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
    if (!this._loaded()) {
      this.load();
      return;
    }

    this.loadMore();
  }

  loadAdminPage(page: number = 1): void {
  if (this._adminLoading()) {
    return;
  }

  this._adminLoading.set(true);
  this._adminError.set(null);

  const params = new HttpParams().set('page', page);

  this.http
    .get<MedicalCentersApiResponse>(this.endpoint, { params })
    .subscribe({
      next: response => {
        this._adminCenters.set(mapMedicalCenters(response.data ?? []));
        this._adminPagination.set(response.meta);
        this._adminLoading.set(false);
      },
      error: () => {
        this._adminError.set(
          'تعذر تحميل المراكز الطبية. يرجى المحاولة مجدداً.',
        );
        this._adminLoading.set(false);
      },
    });
}
}
