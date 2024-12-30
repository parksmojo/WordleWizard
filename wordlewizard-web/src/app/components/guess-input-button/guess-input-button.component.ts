import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuessInputPopupComponent } from '../guess-input-popup/guess-input-popup.component';
import { Guess } from 'wordlewizard-shared';

@Component({
  selector: 'app-guess-input-button',
  imports: [GuessInputPopupComponent],
  templateUrl: './guess-input-button.component.html',
  styleUrl: './guess-input-button.component.css',
})
export class GuessInputButtonComponent {
  @Input() presetGuess = '';
  @Output() newGuess = new EventEmitter<Guess>();
  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  submitGuess(newGuess: Guess) {
    this.newGuess.emit(newGuess);
    this.showPopup = false;
  }
}
