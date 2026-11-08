import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { Router } from '@angular/router';

import { DoctorsService } from '../../../../../core/services/doctors.service';
import { Doctor } from '../../../../../core/models/doctor.model';
import { mapDoctor } from '../../../../../core/mappers/doctor.mapper';
import { WeeklySchedule } from '../../../../../core/constants/week-days';
import { formatWeeklySchedule } from '../../../../../core/utils/working-hours';

import {
  DataTableColumn,
  DataTableComponent,
} from '../../../../../shared/components/data-table/data-table.component';

import { DataPaginationComponent } from '../../../../../shared/components/data-pagination/data-pagination.component';
import { AdminErrorAlertComponent } from '../../../../../shared/components/admin-error-alert/admin-error-alert.component';
import { AdminPageLayoutComponent } from '../../../../../shared/components/admin-page-layout/admin-page-layout.component';
import { AdminSearchComponent } from '../../../../../shared/components/admin-search/admin-search.component';
import { AdminStatCardComponent } from '../../../../../shared/components/admin-stat-card/admin-stat-card.component';

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
  private readonly router = inject(Router);

  readonly doctors = this.service.adminDoctors;
  readonly loading = this.service.adminLoading;
  readonly error = this.service.adminError;
  readonly pagination = this.service.adminPagination;

  readonly search = signal('');

  readonly columns: DataTableColumn<Doctor>[] = [
    { key: 'id', label: 'المعرّف', align: 'center' },
    { key: 'name', label: 'اسم الطبيب' },
    { key: 'specialty', label: 'التخصص' },
    { key: 'governorate', label: 'المحافظة' },
    { key: 'area', label: 'المنطقة' },
    { key: 'address', label: 'العنوان' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'mobile', label: 'الجوال' },
    { key: 'whatsapp', label: 'واتساب' },
    { key: 'experienceYears', label: 'سنوات الخبرة', align: 'center' },
    { key: 'profileImage', label: 'صورة الملف' },
    { key: 'about', label: 'نبذة عن الطبيب' },
    {
      key: 'workingHours',
      label: 'ساعات العمل الأسبوعية',
      format: value => formatWeeklySchedule(value as WeeklySchedule),
    },
    { key: 'mapUrl', label: 'رابط الخريطة' },
  ];

  readonly results = computed(() => {
    const query = this.search().trim().toLowerCase();

    const doctors = this.doctors().map(mapDoctor);

    if (!query) {
      return doctors;
    }

    return doctors.filter(doctor =>
      [
        doctor.name,
        doctor.specialty,
        doctor.area,
        doctor.governorate,
        doctor.phone ?? '',
      ].some(value => value.toLocaleLowerCase().includes(query)),
    );
  });

  ngOnInit(): void {
    this.service.loadAdminPage(1);
  }

  changePage(page: number): void {
    this.service.loadAdminPage(page);
  }

  addDoctor(): void {
    this.router.navigate(['/admin/doctors/create']);
  }

  editDoctor(doctor: Doctor): void {
    console.log('Edit doctor:', doctor.id);
  }

  deleteDoctor(doctor: Doctor): void {
    console.log('Delete doctor:', doctor.id);
  }

  retry(): void {
    this.service.loadAdminPage(this.pagination()?.current_page ?? 1);
  }
}
