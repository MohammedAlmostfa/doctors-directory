import { Component, input } from '@angular/core';

@Component({
  selector: 'app-listing-address',
  standalone: true,
  template: `
    <article class="card p-6">
      <h2 class="flex items-center gap-2 text-xl font-semibold mb-4">
        <span class="icon text-brand" aria-hidden="true">pin_drop</span>عنوان {{ noun() }}
      </h2>
      <div class="flex items-start gap-3 bg-canvas p-4 rounded-lg border border-line">
        <span class="icon text-[24px] text-brand mt-0.5" aria-hidden="true">location_city</span>
        <div class="flex-1">
          <address class="not-italic font-medium leading-8">{{ fullAddress() }}</address>
          <p class="mt-1 text-sm text-subtle">المنطقة: {{ area() }} <span aria-hidden="true">•</span> المحافظة: {{ city() }}</p>
        </div>
      </div>
      <a [href]="mapUrl()" target="_blank" rel="noopener" class="btn-outline mt-4">
        <span class="icon text-[18px]" aria-hidden="true">map</span>فتح الموقع على الخريطة
      </a>
    </article>
  `,
})
export class ListingAddressComponent {
  noun = input.required<string>();
  fullAddress = input.required<string>();
  area = input.required<string>();
  city = input.required<string>();
  mapUrl = input.required<string>();
}
