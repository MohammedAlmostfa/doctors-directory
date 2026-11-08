import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-actions',
  standalone: true,
  templateUrl: './form-actions.component.html',
})
export class FormActionsComponent {
  saving = input(false);
  disabled = input(false);

  saveLabel = input('حفظ البيانات');
  cancelLabel = input('إلغاء');

  save = output<void>();
  cancel = output<void>();
}
