
import { Component, input, output } from '@angular/core';

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: 'start' | 'center' | 'end';
  width?: string;
  format?: (value: unknown, row: T) => string;
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

  getValue(row: T, column: DataTableColumn<T>): string {
    const value = String(column.key)
      .split('.')
      .reduce<unknown>((current, key) => {
        if (current === null || typeof current !== 'object') {
          return undefined;
        }

        return (current as Record<string, unknown>)[key];
      }, row);

    return column.format
      ? column.format(value, row)
      : this.formatValue(value);
  }

  private formatValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }

    if (typeof value === 'boolean') {
      return value ? 'نعم' : 'لا';
    }

    if (Array.isArray(value)) {
      return value.length
        ? value.map(item => this.formatValue(item)).join('، ')
        : '—';
    }

    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([key, item]) => `${key}: ${this.formatValue(item)}`)
        .join('، ') || '—';
    }

    return String(value);
  }

  onEdit(row: T): void {
    this.edit.emit(row);
  }

  onDelete(row: T): void {
    this.delete.emit(row);
  }
}
