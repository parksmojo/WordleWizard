import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GuessStats, UserStats } from '../../model/user-stats/user-stats';
import { HomeService } from '../../presenters/home/home.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-stats',
  imports: [MatIconModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  @Input() show = false;
  stats: UserStats = { uid: 'n/a', username: 'n/a', guesses: [] };
  averages: GuessStats[] = [];
  totalGuesses = 0;

  private NameSortAsc = true;
  private ScoreSortAsc = false;
  private CountSortAsc = false;
  private GuessNumSortAsc = false;

  constructor(
    private presenter: HomeService,
    protected settings: SettingsService
  ) {
    this.refreshStats();
  }

  closePopup() {
    console.log('Closing Stats popup');
    this.show = false;
    document.body.classList.remove('no-scroll');
  }
  openPopup() {
    console.log('Opening Stats popup');
    this.refreshStats();
    this.show = true;
    document.body.classList.add('no-scroll');
  }

  private async refreshStats() {
    console.log('Refreshing stats');
    this.stats = await this.presenter.getStats();
    this.averages = this.stats.guesses.map((guess) => ({
      word: guess.word,
      count: guess.count,
      score: parseFloat((guess.score / guess.count).toFixed(2)),
      guessNumber: Math.round(guess.guessNumber / guess.count),
    }));
    this.totalGuesses = this.stats.guesses.reduce(
      (sum, item) => sum + item.count,
      0
    );
    this.averages.sort((a, b) => {
      if (a.guessNumber === b.guessNumber) {
        return b.score - a.score;
      } else {
        return a.guessNumber - b.guessNumber;
      }
    });
  }

  sortWords(
    sortAsc: boolean,
    ascFn: (a: GuessStats, b: GuessStats) => number,
    descFn: (a: GuessStats, b: GuessStats) => number
  ) {
    if (sortAsc) {
      this.averages.sort(ascFn);
    } else {
      this.averages.sort(descFn);
    }
  }
  sortWordsByName() {
    console.log('Sorting words by name');
    this.sortWords(
      this.NameSortAsc,
      (a, b) => a.word.localeCompare(b.word),
      (a, b) => b.word.localeCompare(a.word)
    );
    this.NameSortAsc = !this.NameSortAsc;
  }
  sortWordsByScore() {
    console.log('Sorting words by score');
    this.sortWords(
      this.ScoreSortAsc,
      (a, b) => a.score - b.score,
      (a, b) => b.score - a.score
    );
    this.ScoreSortAsc = !this.ScoreSortAsc;
  }
  sortWordsByCount() {
    console.log('Sorting words by count');
    this.sortWords(
      this.CountSortAsc,
      (a, b) => a.count - b.count,
      (a, b) => b.count - a.count
    );
    this.CountSortAsc = !this.CountSortAsc;
  }
  sortWordsByGuessNum() {
    console.log('Sorting words by guess number');
    this.sortWords(
      this.GuessNumSortAsc,
      (a, b) => a.guessNumber - b.guessNumber,
      (a, b) => b.guessNumber - a.guessNumber
    );
    this.GuessNumSortAsc = !this.GuessNumSortAsc;
  }
}
