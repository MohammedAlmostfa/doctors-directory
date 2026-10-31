import { Component, input } from '@angular/core';
import { telHref } from '../../../../utils/contact-links';

@Component({
  selector: 'app-mobile-call-bar',
  standalone: true,
  template: `
    <div class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-line p-3 flex gap-2">
      <a [href]="tel(phone())" class="btn-primary flex-1 !h-11">
        <span class="icon text-[20px]" aria-hidden="true">call</span>اتصال ب{{ noun() }}
      </a>
      <a [href]="mapUrl()" target="_blank" rel="noopener" class="btn-outline !h-11 !px-4" aria-label="فتح الموقع على الخريطة">
        <span class="icon text-[20px]" aria-hidden="true">map</span>
      </a>
    </div>
  `,
})
export class MobileCallBarComponent {
  noun = input.required<string>();
  phone = input.required<string>();
  mapUrl = input.required<string>();
  readonly tel = telHref;
}
