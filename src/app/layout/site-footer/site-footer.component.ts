import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  readonly year = new Date().getFullYear();
  readonly links = [
    { path: '/', label: 'الرئيسية' },
    { path: '/doctors', label: 'الأطباء' },
    { path: '/specialties', label: 'التخصصات' },
    { path: '/pharmacies', label: 'الصيدليات' },
    { path: '/centers', label: 'المراكز الطبية' },
    { path: '/labs', label: 'المخابر' },
  ];
}
