import { Component, Input } from '@angular/core';
import { GuessRowComponent } from '../guess-row/guess-row.component';
import { Guess } from 'wordlebuddy-shared';

@Component({
  selector: 'app-guess-board',
  imports: [GuessRowComponent],
  templateUrl: './guess-board.component.html',
  styleUrl: './guess-board.component.css',
})
export class GuessBoardComponent {
  @Input() guesses: Guess[] = [];
}
