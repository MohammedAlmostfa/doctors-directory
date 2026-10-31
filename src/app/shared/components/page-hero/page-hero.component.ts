import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  template: `
    <section class="py-10 md:py-14 bg-white border-b border-line">
      <div class="container-page">
        <h1 class="text-3xl md:text-4xl font-bold mb-3">{{ title() }}</h1>
        <p class="text-lg text-muted max-w-2xl">{{ subtitle() }}</p>
      </div>
    </section>
  `,
})
export class PageHeroComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
