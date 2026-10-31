import { signal } from '@angular/core';

/**
 * مؤقت: يحاكي زمن تحميل الـ API لنرى الـ skeleton.
 * احذفه عند ربط HttpClient (انظر الشرح بآخر الرد).
 */
export function simulateLoading(ms = 1500) {
  const loading = signal(true);
  setTimeout(() => loading.set(false), ms);
  return loading;
}
