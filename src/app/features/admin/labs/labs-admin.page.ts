
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Lab } from '../../../core/models/lab.model';
import { LabsService } from '../../../core/services/labs.service';

import {
  DataTableColumn,
  DataTableComponent,
} from '../../../shared/components/data-table/data-table.component';

import { DataPaginationComponent } from '../../../shared/components/data-pagination/data-pagination.component';

@Component({
  selector: 'app-admin-labs',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    DataPaginationComponent,
  ],
  templateUrl: './labs-admin.page.html',
})
export class LabsAdminPage implements OnInit {
  readonly labsService = inject(LabsService);

  readonly labs = this.labsService.adminLabs;
  readonly loading = this.labsService.adminLoading;
  readonly error = this.labsService.adminError;
  readonly pagination = this.labsService.adminPagination;

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
    this.labsService.loadAdminPage(1);
  }

  changePage(page: number): void {
    this.labsService.loadAdminPage(page);
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
    this.labsService.loadAdminPage(
      this.pagination()?.current_page ?? 1,
    );
  }
}
