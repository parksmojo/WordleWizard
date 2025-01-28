import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuessInputPopupComponent } from '../guess-input-popup/guess-input-popup.component';
import { Guess } from '../../model/guess/guess';

@Component({
  selector: 'app-guess-input-button',
  imports: [GuessInputPopupComponent],
  templateUrl: './guess-input-button.component.html',
  styleUrl: './guess-input-button.component.css',
})
export class GuessInputButtonComponent {
  @Input() guessNumber = 0;
  @Input() presetGuess = '';
  @Output() newGuess = new EventEmitter<Guess>();
  showPopup = false;

  openPopup() {
    this.showPopup = true;
    document.body.classList.add('no-scroll');
  }

  closePopup() {
    this.showPopup = false;
    document.body.classList.remove('no-scroll');
  }

  submitGuess(newGuess: Guess) {
    this.newGuess.emit(newGuess);
    this.closePopup();
  }
}
