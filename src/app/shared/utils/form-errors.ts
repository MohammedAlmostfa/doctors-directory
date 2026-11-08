import { ValidationErrors } from '@angular/forms';

export function getFormErrorMessage(
  errors: ValidationErrors | null,
): string | null {
  if (!errors) return null;

  if (errors['required']) return 'هذا الحقل مطلوب';
  if (errors['email']) return 'البريد الإلكتروني غير صحيح';
  if (errors['minlength']) return 'عدد الأحرف أقل من المطلوب';
  if (errors['maxlength']) return 'عدد الأحرف أكبر من المسموح';
  if (errors['min']) return 'القيمة أقل من الحد المسموح';
  if (errors['max']) return 'القيمة أكبر من المسموح';
  if (errors['pattern']) return 'صيغة البيانات غير صحيحة';

  return 'قيمة الحقل غير صحيحة';
}
