import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GuessStats, UserStats } from '../../model/user-stats/user-stats';
import { HomeService } from '../../presenters/home/home.service';

@Component({
  selector: 'app-stats',
  imports: [MatIconModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  @Input() show: boolean = false;
  stats: UserStats = { uid: 'n/a', username: 'n/a', guesses: [] };
  averages: GuessStats[] = [];

  private NameSortAsc: boolean = true;
  private ScoreSortAsc: boolean = false;
  private CountSortAsc: boolean = false;

  constructor(private presenter: HomeService) {}

  closePopup() {
    this.show = false;
    document.body.classList.remove('no-scroll');
  }
  openPopup() {
    this.refreshStats();
    this.show = true;
    document.body.classList.add('no-scroll');
  }
  private async refreshStats() {
    this.stats = await this.presenter.getStats();
    this.averages = this.stats.guesses.map((guess) => ({
      word: guess.word,
      count: guess.count,
      score: parseFloat((guess.score / guess.count).toFixed(2)),
      guessNumber: parseFloat((guess.guessNumber / guess.count).toFixed(2)),
    }));
  }

  sortWords(fn: (a: GuessStats, b: GuessStats) => number) {
    this.averages.sort(fn);
  }
  sortWordsByName() {
    if (this.NameSortAsc) {
      this.sortWords((a, b) => a.word.localeCompare(b.word));
    } else {
      this.sortWords((a, b) => b.word.localeCompare(a.word));
    }
    this.NameSortAsc = !this.NameSortAsc;
  }
  sortWordsByScore() {
    if (this.ScoreSortAsc) {
      this.sortWords((a, b) => a.score - b.score);
    } else {
      this.sortWords((a, b) => b.score - a.score);
    }
    this.ScoreSortAsc = !this.ScoreSortAsc;
  }
  sortWordsByCount() {
    if (this.CountSortAsc) {
      this.sortWords((a, b) => a.count - b.count);
    } else {
      this.sortWords((a, b) => b.count - a.count);
    }
    this.CountSortAsc = !this.CountSortAsc;
  }
}
