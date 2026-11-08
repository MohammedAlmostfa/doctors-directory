import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-option-card',
  standalone: true,
  templateUrl: './form-option-card.component.html',
})
export class FormOptionCardComponent {
  name = input.required<string>();
  value = input.required<string>();

  title = input.required<string>();
  description = input('');

  checked = input(false);
  disabled = input(false);

  selected = output<string>();
}
