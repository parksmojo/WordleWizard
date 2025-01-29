import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Guess } from '../../model/guess/guess';
import { GuessInputPopupComponent } from '../guess-input-popup/guess-input-popup.component';

@Component({
  selector: 'app-helpful',
  imports: [GuessInputPopupComponent],
  templateUrl: './helpful.component.html',
  styleUrl: './helpful.component.css',
})
export class HelpfulComponent {
  @Input() words: string[] = [];
  @Input() letters: string[] = [];
  @Input() guessNumber: number = 0;
  presetGuess = '';

  pickGuess(word: string) {
    console.log('Picking helpful guess:', word);
    this.presetGuess = word;
    this.openPopup();
  }

  @Output() newGuess = new EventEmitter<Guess>();
  showPopup = false;

  openPopup() {
    console.log('Opening GuessInputPopup from HelpfulComponent');
    this.showPopup = true;
    document.body.classList.add('no-scroll');
  }

  closePopup() {
    console.log('Closing GuessInputPopup from HelpfulComponent');
    this.showPopup = false;
    document.body.classList.remove('no-scroll');
  }

  submitGuess(newGuess: Guess) {
    console.log('Submitting guess from HelpfulComponent: ' + newGuess);
    this.newGuess.emit(newGuess);
    this.closePopup();
  }
}
