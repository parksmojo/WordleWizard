import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuessInputPopupComponent } from '../guess-input-popup/guess-input-popup.component';
import { Guess } from 'wordlewizard-shared';

@Component({
  selector: 'app-list',
  imports: [FormsModule, GuessInputPopupComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() possibleGuesses: string[] = [];
  @Input() possibleAnswers: string[] = [];
  presetGuess = '';

  private _showAnswers: boolean = false;
  list: string[] = [];

  @Input()
  set showAnswers(value: boolean) {
    this._showAnswers = value;
    this.updateList();
  }

  get showAnswers(): boolean {
    return this._showAnswers;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateList();
  }

  private updateList(): void {
    this.list = this._showAnswers ? this.possibleAnswers : this.possibleGuesses; //.slice(0, 100);
  }

  pickGuess(word: string) {
    this.presetGuess = word;
    this.openPopup();
  }

  @Output() newGuess = new EventEmitter<Guess>();
  showPopup = false;

  openPopup() {
    this.showPopup = true;
    document.body.classList.add('no-scroll');
  }

  closePopup() {
    this.showPopup = false;
    document.body.classList.remove('no-scroll');
  }

  submitGuess(newGuess: Guess) {
    this.newGuess.emit(newGuess);
    this.closePopup();
  }
}
