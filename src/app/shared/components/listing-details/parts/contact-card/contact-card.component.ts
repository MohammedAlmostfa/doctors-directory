import { Component, input } from '@angular/core';
import { telHref, whatsappHref } from '../../../../utils/contact-links';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  template: `
    <section class="card p-6" aria-labelledby="contact-title">
      <h2 id="contact-title" class="flex items-center gap-2 text-lg font-semibold mb-4">
        <span class="icon text-brand" aria-hidden="true">call</span>معلومات التواصل
      </h2>

      <p class="text-xs text-subtle">هاتف {{ noun() }}</p>
      <p class="font-heading text-xl font-bold tabular-nums mt-0.5"><bdi dir="ltr">{{ phone() }}</bdi></p>
      <a [href]="tel(phone())" class="btn-primary w-full !h-12 mt-3">
        <span class="icon text-[20px]" aria-hidden="true">call</span>اتصال ب{{ noun() }}
      </a>

      @if (mobile(); as m) {
        <hr class="border-line my-5">
        <p class="text-xs text-subtle">الجوال</p>
        <p class="font-heading text-lg font-bold tabular-nums mt-0.5"><bdi dir="ltr">{{ m }}</bdi></p>
        <a [href]="tel(m)" class="btn-outline w-full !h-11 mt-3">
          <span class="icon text-[18px]" aria-hidden="true">smartphone</span>اتصال
        </a>
        @if (whatsapp(); as w) {
          <a [href]="wa(w)" target="_blank" rel="noopener" class="btn-outline w-full !h-11 mt-2">
            <span class="icon text-[18px]" aria-hidden="true">chat</span>واتساب
          </a>
        }
      }

      @if (email(); as e) {
        <hr class="border-line my-5">
        <p class="text-xs text-subtle">البريد الإلكتروني</p>
        <a [href]="'mailto:' + e" class="block mt-0.5 text-sm font-medium text-brand hover:underline break-all"><bdi dir="ltr">{{ e }}</bdi></a>
      }
    </section>
  `,
})
export class ContactCardComponent {
  noun = input.required<string>();
  phone = input.required<string>();
  mobile = input<string>();
  whatsapp = input<string>();
  email = input<string>();

  readonly tel = telHref;
  readonly wa = whatsappHref;
}
