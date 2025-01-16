import { Component } from '@angular/core';
import { GuessBoardComponent } from '../../components/guess-board/guess-board.component';
import { Guess } from '../../model/domain/Guess';
import { GuessInputButtonComponent } from '../../components/guess-input-button/guess-input-button.component';
import { ListComponent } from '../../components/list/list.component';
import { WordList } from '../../model/word-list/word-list';
import { HelpfulComponent } from '../../components/helpful/helpful.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    GuessBoardComponent,
    GuessInputButtonComponent,
    ListComponent,
    HelpfulComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  guesses: Guess[] = [];
  foundAnswer: boolean = false;
  wordList: WordList = new WordList();
  activeTab: string = 'all';

  addGuess(guess: Guess) {
    this.guesses.push(guess);
    if (guess.score === -1) {
      this.foundAnswer = true;
    }
    this.wordList.filterByGuess(guess);
  }

  resetGame() {
    this.guesses = [];
    this.foundAnswer = false;
    this.wordList.reset();
  }
}
