import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'دليلك الطبي | ابحث عن طبيب أو صيدلية أو مركز طبي في سوريا',
        loadComponent: () =>
          import('./features/public/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'doctors',
        loadComponent: () =>
          import('./features/public/doctors/doctors.page').then(m => m.DoctorsPage),
      },
      {
        path: 'doctors/:id',
        loadComponent: () =>
          import('./features/public/doctors/doctor-details.page').then(m => m.DoctorDetailsPage),
      },
      {
        path: 'pharmacies',
        loadComponent: () =>
          import('./features/public/pharmacies/pharmacies.page').then(m => m.PharmaciesPage),
      },
      {
        path: 'pharmacies/:id',
        loadComponent: () =>
          import('./features/public/pharmacies/pharmacy-details.page').then(m => m.PharmacyDetailsPage),
      },
      {
        path: 'centers',
        loadComponent: () =>
          import('./features/public/centers/centers.page').then(m => m.CentersPage),
      },
      {
        path: 'centers/:id',
        loadComponent: () =>
          import('./features/public/centers/center-details.page').then(m => m.CenterDetailsPage),
      },
      {
        path: 'labs',
        loadComponent: () =>
          import('./features/public/labs/labs.page').then(m => m.LabsPage),
      },
      {
        path: 'labs/:id',
        loadComponent: () =>
          import('./features/public/labs/lab-details.page').then(m => m.LabDetailsPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
