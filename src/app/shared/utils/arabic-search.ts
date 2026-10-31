/** توحيد الهمزات والتاء المربوطة والألف المقصورة لتحسين البحث العربي */
export const normalizeArabic = (t: string): string =>
  t.trim().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');

/** true إذا كان البحث فارغ، أو إذا وُجد بأي حقل من الحقول المعطاة */
export function matchesQuery(query: string, ...fields: string[]): boolean {
  const q = normalizeArabic(query);
  return !q || normalizeArabic(fields.join(' ')).includes(q);
}
