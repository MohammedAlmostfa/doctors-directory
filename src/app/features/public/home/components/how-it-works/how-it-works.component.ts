import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  template: `
    <ol class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
      @for (s of steps; track s.title; let i = $index) {
        <li class="relative card p-6">
          <span class="absolute -top-4 start-6 w-8 h-8 rounded-full bg-brand text-white font-heading font-bold flex items-center justify-center">{{ i + 1 }}</span>
          <span class="icon text-[32px] text-brand" aria-hidden="true">{{ s.icon }}</span>
          <h3 class="font-heading text-lg font-semibold mt-3">{{ s.title }}</h3>
          <p class="text-sm text-muted leading-7 mt-2">{{ s.text }}</p>
        </li>
      }
    </ol>
  `,
})
export class HowItWorksComponent {
  readonly steps = [
    { icon: 'search', title: 'ابحث', text: 'اكتب اسم الطبيب أو التخصص واختر مدينتك، أو تصفّح الصيدليات والمراكز والمخابر.' },
    { icon: 'info', title: 'اطّلع على التفاصيل', text: 'العنوان وساعات الدوام الأسبوعية، ومعرفة إن كان المكان مفتوحاً الآن بتوقيت دمشق.' },
    { icon: 'call', title: 'تواصل مباشرة', text: 'اتصل بضغطة زر، أو افتح الموقع على الخريطة، أو راسل عبر واتساب عند توفره.' },
  ];
}
