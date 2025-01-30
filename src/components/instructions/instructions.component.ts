import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-instructions',
  imports: [MatIconModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  @Input() showInstructions = false;

  closePopup() {
    console.log('Closing Instructions popup');
    this.showInstructions = false;
    document.body.classList.remove('no-scroll');
  }
  openPopup() {
    console.log('Opening Instructions popup');
    this.showInstructions = true;
    document.body.classList.add('no-scroll');
  }
}
