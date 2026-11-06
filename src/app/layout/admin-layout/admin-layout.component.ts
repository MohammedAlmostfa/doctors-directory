
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

interface AdminNavItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {

  readonly navigationItems: AdminNavItem[] = [
    {
      label: 'الأطباء',
      route: '/admin/doctors',
      icon: 'stethoscope',
      exact: true,
    },
    {
      label: 'المراكز الطبية',
      route: '/admin/centers',
      icon: 'local_hospital',
    },
    {
      label: 'المخابر',
      route: '/admin/labs',
      icon: 'science',
    },
    {
      label: 'الصيدليات',
      route: '/admin/pharmacies',
      icon: 'medication',
    },
  ];

}
