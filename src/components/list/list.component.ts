import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuessInputPopupComponent } from '../guess-input-popup/guess-input-popup.component';
import { Guess } from '../../model/guess/guess';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-list',
  imports: [FormsModule, GuessInputPopupComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnChanges {
  @Input() possibleGuesses: string[] = [];
  @Input() possibleAnswers: string[] = [];
  @Input() guessNumber = 0;
  presetGuess = '';

  private _showAnswers = false;
  list: string[] = [];

  constructor(private settings: SettingsService) {
    this._showAnswers = settings.showOnlyAnswers;
  }

  @Input()
  set showAnswers(value: boolean) {
    console.log(`${value ? 'Showing' : 'Hiding'} answer list`);
    this._showAnswers = value;
    this.updateList();
  }
  get showAnswers(): boolean {
    return this._showAnswers;
  }

  ngOnChanges(): void {
    this.updateList();
  }

  private updateList(): void {
    console.log(`Updating displayed lists`);
    this.list = this._showAnswers ? this.possibleAnswers : this.possibleGuesses; //.slice(0, 100);
  }

  pickGuess(word: string) {
    console.log('Picking helpful guess:', word);
    this.presetGuess = word;
    this.openPopup();
  }

  @Output() newGuess = new EventEmitter<Guess>();
  showPopup = false;

  openPopup() {
    console.log('Opening GuessInputPopup from ListComponent');
    this.showPopup = true;
    document.body.classList.add('no-scroll');
  }

  closePopup() {
    console.log('Closing GuessInputPopup from ListComponent');
    this.showPopup = false;
    document.body.classList.remove('no-scroll');
  }

  submitGuess(newGuess: Guess) {
    console.log('Submitting guess from ListComponent: ' + newGuess);
    this.newGuess.emit(newGuess);
    this.closePopup();
  }
}
