import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GOVERNORATES } from '../../../../../core/constants/governorates';
import { SPECIALTIES } from '../../../../../core/constants/specialties';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-hero.component.html',
})
export class HomeHeroComponent {
  private router = inject(Router);

  readonly governorates = GOVERNORATES;
  readonly quick = SPECIALTIES.slice(0, 5);   // اختصارات سريعة تحت البحث

  q = signal('');
  governorate = signal('');

  updateQuery(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.q.set(target.value);
    }
  }

  updateGovernorate(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.governorate.set(target.value);
    }
  }

  search() {
    // null = الراوتر بيشيل الـ param من الرابط بدل ما يكتب ?q= فاضي
    this.router.navigate(['/doctors'], {
      queryParams: { q: this.q().trim() || null, governorate: this.governorate() || null },
    });
  }
}
