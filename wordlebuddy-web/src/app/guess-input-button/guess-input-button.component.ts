import { Component, EventEmitter, Output } from '@angular/core';
import { GuessInputPopupComponent } from '../guess-input-popup/guess-input-popup.component';
import { Guess } from 'wordlebuddy-shared';

@Component({
  selector: 'app-guess-input-button',
  imports: [GuessInputPopupComponent],
  templateUrl: './guess-input-button.component.html',
  styleUrl: './guess-input-button.component.css',
})
export class GuessInputButtonComponent {
  @Output() newGuess = new EventEmitter<Guess>();
  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  submitGuess(newGuess: Guess) {
    console.log('submitting guess', newGuess);
    this.newGuess.emit(newGuess);
    this.showPopup = false;
  }
}