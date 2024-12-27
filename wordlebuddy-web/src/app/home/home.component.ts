import { Component } from '@angular/core';
import { GuessBoardComponent } from '../guess-board/guess-board.component';
import { Guess } from 'wordlebuddy-shared';
import { GuessInputButtonComponent } from '../guess-input-button/guess-input-button.component';

@Component({
  selector: 'app-home',
  imports: [GuessBoardComponent, GuessInputButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  guesses = [new Guess('empty', 'bbbbb')];

  addGuess(guess: Guess) {
    this.guesses.push(guess);
  }
}
