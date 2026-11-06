
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Pharmacy } from '../../../core/models/pharmacy.model';
import { PharmaciesService } from '../../../core/services/pharmacies.service';

import {
  DataTableColumn,
  DataTableComponent,
} from '../../../shared/components/data-table/data-table.component';

import { DataPaginationComponent } from '../../../shared/components/data-pagination/data-pagination.component';

@Component({
  selector: 'app-admin-pharmacies',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    DataPaginationComponent,
  ],
  templateUrl: './pharmacies-admin.page.html',
})
export class PharmaciesAdminPage implements OnInit {
  readonly pharmaciesService = inject(PharmaciesService);

  readonly pharmacies = this.pharmaciesService.adminPharmacies;
  readonly loading = this.pharmaciesService.adminLoading;
  readonly error = this.pharmaciesService.adminError;
  readonly pagination = this.pharmaciesService.adminPagination;

  readonly search = signal('');

  readonly columns: DataTableColumn<Pharmacy>[] = [
    { key: 'name', label: 'اسم الصيدلية' },
    { key: 'governorate', label: 'المحافظة' },
    { key: 'area', label: 'المنطقة' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'mobile', label: 'الموبايل' },
  ];

  readonly results = computed(() => {
    const query = this.search().trim().toLowerCase();

    if (!query) {
      return this.pharmacies();
    }

    return this.pharmacies().filter(pharmacy =>
      [
        pharmacy.name,
        pharmacy.governorate,
        pharmacy.area,
        pharmacy.phone ?? '',
        pharmacy.mobile ?? '',
      ].some(value => value.toLowerCase().includes(query)),
    );
  });

  ngOnInit(): void {
    this.pharmaciesService.loadAdminPage(1);
  }

  changePage(page: number): void {
    this.pharmaciesService.loadAdminPage(page);
  }

  retry(): void {
    this.pharmaciesService.loadAdminPage(
      this.pagination()?.current_page ?? 1,
    );
  }
}
