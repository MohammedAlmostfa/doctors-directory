import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  menuOpen = signal(false);

  // نعرّف الروابط مرة وحدة ونعمل @for، بدل ما نكرّرها بالـ HTML مرتين (ديسكتوب + موبايل)
  readonly links = [
    { path: '/', label: 'الرئيسية', exact: true },
    { path: '/doctors', label: 'الأطباء', exact: false },
    { path: '/pharmacies', label: 'الصيدليات', exact: false },
    { path: '/centers', label: 'المراكز الطبية', exact: false },
    { path: '/labs', label: 'المخابر', exact: false },
  ];

  toggle() { this.menuOpen.update(v => !v); }
  close() { this.menuOpen.set(false); }
}
