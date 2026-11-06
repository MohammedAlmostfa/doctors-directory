import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { MedicalCenter } from '../../../core/models/medical-center.model';
import { MedicalCentersService } from '../../../core/services/medical-centers.service';
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
import { Doctor } from '../../../core/models/doctor.model';

@Component({
  selector: 'app-admin-centers-page',
  standalone: true,
  imports: [
    DataTableComponent,
    DataPaginationComponent,
    AdminErrorAlertComponent,
    AdminPageLayoutComponent,
    AdminSearchComponent,
    AdminStatCardComponent,
  ],
  templateUrl: './centers-admin.page.html',
})
export class CentersAdminPage implements OnInit {
  private readonly service = inject(MedicalCentersService);

  readonly centers = this.service.adminCenters;
  readonly loading = this.service.adminLoading;
  readonly error = this.service.adminError;
  readonly pagination = this.service.adminPagination;

  readonly search = signal('');

  readonly columns: DataTableColumn<MedicalCenter>[] = [
    { key: 'id', label: 'المعرّف', align: 'center' },
    { key: 'name', label: 'اسم المركز الطبي' },
    { key: 'type', label: 'نوع المركز' },
    { key: 'specialties', label: 'الاختصاصات' },
    { key: 'governorate', label: 'المحافظة' },
    { key: 'area', label: 'المنطقة' },
    { key: 'address', label: 'العنوان' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'mobile', label: 'الجوال' },
    { key: 'whatsapp', label: 'واتساب' },
    { key: 'email', label: 'البريد الإلكتروني' },
    { key: 'about', label: 'نبذة عن المركز' },
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
      return this.centers();
    }

    return this.centers().filter(center =>
      [
        center.name,
        center.type,
        center.governorate,
        center.area,
        center.phone ?? '',
        ...center.specialties,
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

    editCenter( ): void {


    }

    deleteCenter(): void {
      // سنضيف تأكيد الحذف وربط API لاحقاً.

    }
}
