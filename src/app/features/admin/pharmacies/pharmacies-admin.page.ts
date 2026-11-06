
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Pharmacy } from '../../../core/models/pharmacy.model';
import { PharmaciesService } from '../../../core/services/pharmacies.service';
import { WeeklySchedule } from '../../../core/constants/week-days';
import { formatWeeklySchedule } from '../../../core/utils/working-hours';

import {
  DataTableColumn,
  DataTableComponent,
} from '../../../shared/components/data-table/data-table.component';

import { DataPaginationComponent } from '../../../shared/components/data-pagination/data-pagination.component';
import { AdminErrorAlertComponent } from '../../../shared/components/admin-error-alert/admin-error-alert.component';
import { AdminPageLayoutComponent } from '../../../shared/components/admin-page-layout/admin-page-layout.component';
import { AdminSearchComponent } from '../../../shared/components/admin-search/admin-search.component';
import { AdminStatCardComponent } from '../../../shared/components/admin-stat-card/admin-stat-card.component';

@Component({
  selector: 'app-admin-pharmacies-page',
  standalone: true,
  imports: [
    DataTableComponent,
    DataPaginationComponent,
    AdminErrorAlertComponent,
    AdminPageLayoutComponent,
    AdminSearchComponent,
    AdminStatCardComponent,
  ],
  templateUrl: './pharmacies-admin.page.html',
})
export class PharmaciesAdminPage implements OnInit {
  private readonly service = inject(PharmaciesService);

  readonly pharmacies = this.service.adminPharmacies;
  readonly loading = this.service.adminLoading;
  readonly error = this.service.adminError;
  readonly pagination = this.service.adminPagination;

  readonly search = signal('');

  readonly columns: DataTableColumn<Pharmacy>[] = [
    { key: 'id', label: 'المعرّف', align: 'center' },
    { key: 'name', label: 'اسم الصيدلية' },
    { key: 'governorate', label: 'المحافظة' },
    { key: 'area', label: 'المنطقة' },
    { key: 'address', label: 'العنوان' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'mobile', label: 'الموبايل' },
    { key: 'whatsapp', label: 'واتساب' },
    { key: 'email', label: 'البريد الإلكتروني' },
    { key: 'about', label: 'نبذة عن الصيدلية' },
    { key: 'mapUrl', label: 'رابط الخريطة' },
    {
      key: 'workingHours',
      label: 'ساعات العمل الأسبوعية',
      format: value => formatWeeklySchedule(value as WeeklySchedule),
    },
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
    this.service.loadAdminPage(1);
  }

  changePage(page: number): void {
    this.service.loadAdminPage(page);
  }

  retry(): void {
    this.service.loadAdminPage(
      this.pagination()?.current_page ?? 1,
    );
  }
}
