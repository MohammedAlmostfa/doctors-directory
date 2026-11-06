
import { Component, input, output } from '@angular/core';

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: 'start' | 'center' | 'end';
  width?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<T extends { id: number | string }> {
  readonly columns = input.required<DataTableColumn<T>[]>();
  readonly data = input.required<T[]>();

  readonly loading = input(false);
  readonly emptyTitle = input('لا توجد بيانات');
  readonly emptyMessage = input('لم يتم العثور على أي نتائج.');

  readonly showActions = input(true);
  readonly showEdit = input(true);
  readonly showDelete = input(true);

  readonly edit = output<T>();
  readonly delete = output<T>();

  getValue(row: T, key: keyof T | string): unknown {
    return (row as Record<string, unknown>)[key as string] ?? '—';
  }

  onEdit(row: T): void {
    this.edit.emit(row);
  }

  onDelete(row: T): void {
    this.delete.emit(row);
  }
}
