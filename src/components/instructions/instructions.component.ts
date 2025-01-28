import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-instructions',
  imports: [MatIconModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  @Input() showInstructions: boolean = false;

  closePopup() {
    this.showInstructions = false;
    document.body.classList.remove('no-scroll');
  }
  openPopup() {
    this.showInstructions = true;
    document.body.classList.add('no-scroll');
  }
}
