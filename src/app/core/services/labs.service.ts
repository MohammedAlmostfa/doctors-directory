
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { environment } from '../../../environments/environment';

import { LaboratoriesApiResponse } from '../dto/laboratory-api.dto';
import { PaginationMetaDto } from '../dto/pagination.dto';

import { Lab } from '../models/lab.model';

import { mapLaboratories } from '../mappers/laboratory.mapper';

@Injectable({ providedIn: 'root' })
export class LabsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/laboratories`;

  // ============================================
  // Public State - Infinite Scroll
  // ============================================

  private readonly _labs = signal<Lab[]>([]);

  private readonly _loading = signal(false);
  private readonly _loadingMore = signal(false);
  private readonly _loaded = signal(false);

  private readonly _error = signal<string | null>(null);
  private readonly _loadMoreError = signal<string | null>(null);

  private readonly _currentPage = signal(0);
  private readonly _lastPage = signal(1);

  // ============================================
  // Admin State - Server-side Pagination
  // ============================================

  private readonly _adminLabs = signal<Lab[]>([]);
  private readonly _adminLoading = signal(false);
  private readonly _adminError = signal<string | null>(null);
  private readonly _adminPagination = signal<PaginationMetaDto | null>(null);

  // ============================================
  // Public Readonly State
  // ============================================

  readonly labs = this._labs.asReadonly();

  readonly loading = this._loading.asReadonly();
  readonly loadingMore = this._loadingMore.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  readonly error = this._error.asReadonly();
  readonly loadMoreError = this._loadMoreError.asReadonly();

  readonly hasMore = computed(
    () => this._currentPage() < this._lastPage(),
  );

  // ============================================
  // Admin Readonly State
  // ============================================

  readonly adminLabs = this._adminLabs.asReadonly();
  readonly adminLoading = this._adminLoading.asReadonly();
  readonly adminError = this._adminError.asReadonly();
  readonly adminPagination = this._adminPagination.asReadonly();

  // ============================================
  // Public Methods - Infinite Scroll
  // ============================================

  load(): void {
    if (this._loaded() || this._loading()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    const params = new HttpParams().set('page', 1);

    this.http
      .get<LaboratoriesApiResponse>(this.endpoint, { params })
      .subscribe({
        next: response => {
          this._labs.set(mapLaboratories(response.data ?? []));

          this._currentPage.set(response.meta.current_page);
          this._lastPage.set(response.meta.last_page);

          this._loaded.set(true);
          this._loading.set(false);
        },
        error: () => {
          this._error.set(
            'تعذر تحميل المخابر. يرجى المحاولة مجدداً.',
          );

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

    this.http
      .get<LaboratoriesApiResponse>(this.endpoint, { params })
      .subscribe({
        next: response => {
          this._labs.update(current => [
            ...current,
            ...mapLaboratories(response.data ?? []),
          ]);

          this._currentPage.set(response.meta.current_page);
          this._lastPage.set(response.meta.last_page);

          this._loadingMore.set(false);
        },
        error: () => {
          this._loadMoreError.set(
            'تعذر تحميل المزيد من المخابر.',
          );

          this._loadingMore.set(false);
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
    if (!this._loaded()) {
      this.load();
      return;
    }

    this.loadMore();
  }

  // ============================================
  // Admin Methods - Server-side Pagination
  // ============================================

  loadAdminPage(page: number = 1): void {
    if (this._adminLoading()) {
      return;
    }

    this._adminLoading.set(true);
    this._adminError.set(null);

    const params = new HttpParams().set('page', page);

    this.http
      .get<LaboratoriesApiResponse>(this.endpoint, { params })
      .subscribe({
        next: response => {
          this._adminLabs.set(
            mapLaboratories(response.data ?? []),
          );

          this._adminPagination.set(response.meta);
          this._adminLoading.set(false);
        },
        error: () => {
          this._adminError.set(
            'تعذر تحميل المخابر. يرجى المحاولة مجدداً.',
          );

          this._adminLoading.set(false);
        },
      });
  }
}
