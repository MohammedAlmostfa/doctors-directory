import { Component } from '@angular/core';

@Component({
  selector: 'app-home-cta',
  standalone: true,
  template: `
    <div class="rounded-2xl bg-brand-deep text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="text-center md:text-start">
        <h2 class="font-heading text-2xl md:text-3xl font-bold">هل تدير عيادة أو مركزاً طبياً؟</h2>
        <p class="mt-2 text-white/80 max-w-xl">تواصل معنا لإضافة بياناتك وساعات دوامك ليجدك المرضى بسهولة.</p>
      </div>
      <a href="mailto:contact@doctors-directory.example"
         class="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-white text-brand-deep font-semibold transition-colors hover:bg-brand-soft shrink-0">
        <span class="icon text-[20px]" aria-hidden="true">mail</span>تواصل معنا
      </a>
    </div>
  `,
})
export class HomeCtaComponent {}
