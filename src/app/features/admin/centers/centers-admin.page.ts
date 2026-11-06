import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MedicalCenter } from '../../../core/models/medical-center.model';
import { CentersService } from '../../../core/services/medical-centers.service';

import {
  DataTableColumn,
  DataTableComponent,
} from '../../../shared/components/data-table/data-table.component';

import { DataPaginationComponent } from '../../../shared/components/data-pagination/data-pagination.component';

@Component({
  selector: 'app-admin-centers',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    DataPaginationComponent,
  ],
  templateUrl: './centers-admin.page.html',
})
export class CentersAdminPage implements OnInit {
  readonly centersService = inject(CentersService);

  readonly centers = this.centersService.adminCenters;
  readonly loading = this.centersService.adminLoading;
  readonly error = this.centersService.adminError;
  readonly pagination = this.centersService.adminPagination;

  readonly search = signal('');

  readonly columns: DataTableColumn<MedicalCenter>[] = [
    { key: 'name', label: 'اسم المركز الطبي' },
    { key: 'type', label: 'نوع المركز' },
    { key: 'governorate', label: 'المحافظة' },
    { key: 'area', label: 'المنطقة' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'specialties', label: 'الاختصاصات' },
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
    this.centersService.loadAdminPage(1);
  }

  changePage(page: number): void {
    this.centersService.loadAdminPage(page);
  }

  retry(): void {
    this.centersService.loadAdminPage(
      this.pagination()?.current_page ?? 1,
    );
  }
}
