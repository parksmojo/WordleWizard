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
    console.log('Opening GuessInputPopup');
    this.showPopup = true;
    document.body.classList.add('no-scroll');
  }

  closePopup() {
    console.log('Closing GuessInputPopup');
    this.showPopup = false;
    document.body.classList.remove('no-scroll');
  }

  submitGuess(newGuess: Guess) {
    console.groupCollapsed('Submitting guess from input button:');
    console.log(newGuess.toString());
    console.groupEnd();
    this.newGuess.emit(newGuess);
    this.closePopup();
  }
}
