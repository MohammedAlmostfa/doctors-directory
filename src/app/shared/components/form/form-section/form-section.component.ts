import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-section',
  standalone: true,
  templateUrl: './form-section.component.html',
})
export class FormSectionComponent {
  title = input.required<string>();
  icon = input.required<string>();
}
