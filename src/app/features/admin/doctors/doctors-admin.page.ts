
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { DoctorsService } from '../../../core/services/doctors.service';
import { DoctorApiDto } from '../../../core/dto/doctor-api.dto';

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
  selector: 'app-admin-doctors-page',
  standalone: true,
  imports: [
    DataTableComponent,
    DataPaginationComponent,
    AdminErrorAlertComponent,
    AdminPageLayoutComponent,
    AdminSearchComponent,
    AdminStatCardComponent,
  ],
  templateUrl: './doctors-admin.page.html',
})
export class DoctorsAdminPage implements OnInit {
  private readonly service = inject(DoctorsService);

  readonly doctors = this.service.adminDoctors;
  readonly loading = this.service.adminLoading;
  readonly error = this.service.adminError;
  readonly pagination = this.service.adminPagination;

  readonly search = signal('');

  readonly columns: DataTableColumn<DoctorApiDto>[] = [
    { key: 'name', label: 'اسم الطبيب' },
    { key: 'specialty', label: 'التخصص' },
    { key: 'governorate', label: 'المحافظة' },
    { key: 'area', label: 'المنطقة' },
    { key: 'phone', label: 'رقم الهاتف' },
    {
      key: 'experienceYears',
      label: 'سنوات الخبرة',
      align: 'center',
    },
  ];

  readonly results = computed(() => {
    const query = this.search().trim().toLowerCase();

    if (!query) {
      return this.doctors();
    }

    return this.doctors().filter(doctor =>
      [
        doctor.name,
        doctor.specialty.name,
        doctor.area.name,
        doctor.area.governorate?.name ?? '',
        doctor.phone ?? '',
      ].some(value => value.toLowerCase().includes(query)),
    );
  });

  ngOnInit(): void {
    this.service.loadAdminPage(1);
  }

  changePage(page: number): void {
    this.service.loadAdminPage(page);
  }

  addDoctor(): void {
    // سنربطه بنموذج الإضافة في المرحلة التالية.
  }

  editDoctor(doctor: DoctorApiDto): void {
    // سنربطه بنموذج التعديل في المرحلة التالية.
    console.log('Edit doctor:', doctor.id);
  }

  deleteDoctor(doctor: DoctorApiDto): void {
    // سنضيف تأكيد الحذف وربط API لاحقاً.
    console.log('Delete doctor:', doctor.id);
  }

  retry(): void {
    this.service.loadAdminPage(this.pagination()?.current_page ?? 1);
  }
}
