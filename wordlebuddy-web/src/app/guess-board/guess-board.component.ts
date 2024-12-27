import { Component } from '@angular/core';
import { GuessRowComponent } from '../guess-row/guess-row.component';
import { Guess } from 'wordlebuddy-shared';

@Component({
  selector: 'app-guess-board',
  imports: [GuessRowComponent],
  templateUrl: './guess-board.component.html',
  styleUrl: './guess-board.component.css',
})
export class GuessBoardComponent {
  guesses: Guess[] = [
    new Guess('young', 'bbbbb'),
    new Guess('alive', 'gbybb'),
    new Guess('taste', 'bgggb'),
  ];
}
