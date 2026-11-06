
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Lab } from '../../../core/models/lab.model';
import { LabsService } from '../../../core/services/labs.service';

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
  selector: 'app-admin-labs',
  standalone: true,
  imports: [
    DataTableComponent,
    DataPaginationComponent,
    AdminErrorAlertComponent,
    AdminPageLayoutComponent,
    AdminSearchComponent,
    AdminStatCardComponent,
  ],
  templateUrl: './labs-admin.page.html',
})
export class LabsAdminPage implements OnInit {
  private readonly service = inject(LabsService);

  readonly labs = this.service.adminLabs;
  readonly loading = this.service.adminLoading;
  readonly error = this.service.adminError;
  readonly pagination = this.service.adminPagination;

  readonly search = signal('');

  readonly columns: DataTableColumn<Lab>[] = [
    { key: 'name', label: 'اسم المخبر' },
    { key: 'governorate', label: 'المحافظة' },
    { key: 'area', label: 'المنطقة' },
    { key: 'phone', label: 'رقم الهاتف' },
  ];

  readonly results = computed(() => {
    const query = this.search().trim().toLowerCase();

    if (!query) {
      return this.labs();
    }

    return this.labs().filter(lab =>
      [
        lab.name,
        lab.governorate,
        lab.area,
        lab.phone ?? '',
      ].some(value => value.toLowerCase().includes(query)),
    );
  });

  ngOnInit(): void {
    this.service.loadAdminPage(1);
  }

  changePage(page: number): void {
    this.service.loadAdminPage(page);
  }

  addLab(): void {
    // سنربطه بنموذج الإضافة لاحقاً.
  }

  editLab(lab: Lab): void {
    // سنربطه بنموذج التعديل لاحقاً.
    console.log('Edit lab:', lab.id);
  }

  deleteLab(lab: Lab): void {
    // سنضيف تأكيد الحذف وربط API لاحقاً.
    console.log('Delete lab:', lab.id);
  }

  retry(): void {
    this.service.loadAdminPage(
      this.pagination()?.current_page ?? 1,
    );
  }
}
