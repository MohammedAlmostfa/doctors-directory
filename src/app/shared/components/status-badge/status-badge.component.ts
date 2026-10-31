import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span [class]="(open() ? 'badge-open' : 'badge-closed') + (large() ? ' !text-sm !px-3.5 !py-1' : '')">
      <span class="dot"></span>{{ open() ? 'مفتوح الآن' : 'مغلق الآن' }}
    </span>
  `,
})
export class StatusBadgeComponent {
  open = input.required<boolean>();
  large = input(false);   // البادج الكبير بصفحة التفاصيل
}
