import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instructions',
  imports: [],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  @Input() showInstructions: boolean = false;

  closePopup() {
    this.showInstructions = false;
  }
  openPopup() {
    this.showInstructions = true;
  }
}
