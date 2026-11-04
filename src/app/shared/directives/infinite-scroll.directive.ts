
import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);

  readonly disabled = input(false);
  readonly loadMore = output<void>();

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    // حماية عند التشغيل في بيئة لا تدعم IntersectionObserver مثل SSR.
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        const isVisible = entries.some(entry => entry.isIntersecting);

        if (isVisible && !this.disabled()) {
          this.zone.run(() => this.loadMore.emit());
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      },
    );

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
