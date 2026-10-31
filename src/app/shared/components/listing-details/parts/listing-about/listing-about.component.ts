import { Component, input } from '@angular/core';

@Component({
  selector: 'app-listing-about',
  standalone: true,
  template: `
    <article class="card p-6">
      <h2 class="flex items-center gap-2 text-xl font-semibold mb-4">
        <span class="icon text-brand" aria-hidden="true">clinical_notes</span>{{ title() }}
      </h2>
      @if (about()) {
        <p class="text-muted leading-8">{{ about() }}</p>
      }
      @if (chips().length) {
        <div class="mt-6 pt-5 border-t border-line flex flex-wrap gap-2" [class]="about() ? '' : '!mt-0 !pt-0 !border-0'">
          @for (c of chips(); track c) {
            <span class="chip !cursor-default hover:!bg-canvas hover:!text-muted hover:!border-line">{{ c }}</span>
          }
        </div>
      }
    </article>
  `,
})
export class ListingAboutComponent {
  title = input.required<string>();
  about = input<string>('');
  chips = input<readonly string[]>([]);
}
