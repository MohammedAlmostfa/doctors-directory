import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us',
  standalone: true,
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      @for (f of features; track f.title) {
        <div class="flex flex-col gap-3">
          <span class="w-12 h-12 rounded-lg bg-brand-soft text-brand flex items-center justify-center">
            <span class="icon text-[26px]" aria-hidden="true">{{ f.icon }}</span>
          </span>
          <h3 class="font-heading text-lg font-semibold">{{ f.title }}</h3>
          <p class="text-sm text-muted leading-7">{{ f.text }}</p>
        </div>
      }
    </div>
  `,
})
export class WhyUsComponent {
  // كل ميزة هون موجودة فعلاً بالكود (مو وعود تسويقية)
  readonly features = [
    { icon: 'schedule', title: 'مفتوح الآن بدقة', text: 'تُحسب الحالة تلقائياً من ساعات الدوام بتوقيت دمشق، فتعرف قبل أن تخرج إن كان المكان مفتوحاً.' },
    { icon: 'translate', title: 'بحث عربي مرن', text: 'يتجاهل البحث الفروقات بين الهمزات والتاء المربوطة، فتصل للنتيجة مهما اختلفت طريقة الكتابة.' },
    { icon: 'call', title: 'تواصل بضغطة واحدة', text: 'اتصال مباشر أو فتح الموقع على الخريطة من نفس البطاقة، دون خطوات إضافية.' },
    { icon: 'smartphone', title: 'مصمم للهاتف', text: 'واجهة سريعة وواضحة على الجوال، مع شريط اتصال ثابت في صفحة التفاصيل.' },
  ];
}
