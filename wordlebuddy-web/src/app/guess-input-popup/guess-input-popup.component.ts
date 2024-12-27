import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Guess } from 'wordlebuddy-shared';

@Component({
  selector: 'app-guess-input-popup',
  imports: [ReactiveFormsModule],
  templateUrl: './guess-input-popup.component.html',
  styleUrl: './guess-input-popup.component.css',
})
export class GuessInputPopupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() guess = new EventEmitter<Guess>();

  guessForm = new FormGroup({
    word: new FormControl('', Validators.required),
    colors: new FormControl('', Validators.required),
  });

  submitGuess() {
    this.guess.emit(
      new Guess(this.guessForm.value.word!, this.guessForm.value.colors!)
    );
  }

  closePopup() {
    this.close.emit();
  }
}
