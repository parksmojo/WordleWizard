import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild, AfterViewInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Guess } from '../../model/guess/guess';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-guess-input-popup',
  imports: [ReactiveFormsModule, ColorPickerComponent],
  templateUrl: './guess-input-popup.component.html',
  styleUrl: './guess-input-popup.component.css',
})
export class GuessInputPopupComponent implements AfterViewInit {
  @ViewChild('textInput') inputElement!: ElementRef;
  @Input() presetGuess = '';
  @Input() guessNumber = 0;
  @Output() close = new EventEmitter<void>();
  @Output() guess = new EventEmitter<Guess>();
  colors = 'bbbbb';

  guessForm = new FormGroup({
    word: new FormControl('', [
      Validators.required,
      Validators.pattern(Guess.wordFormat),
    ]),
  });

  ngAfterViewInit() {
    console.log(
      `GuessInputPopup initialized${
        this.presetGuess ? ` with preset guess: ${this.presetGuess}` : ''
      }`
    );
    if (this.presetGuess === '') {
      this.inputElement.nativeElement.focus();
    } else {
      this.guessForm.get('word')?.setValue(this.presetGuess);
    }
  }

  setColors(colorString: string) {
    console.log('Guess input popup setting colors:', colorString);
    this.colors = colorString;
  }

  submitGuess() {
    const guess = new Guess(
      this.guessForm.value.word!,
      this.colors,
      this.guessNumber
    );
    console.groupCollapsed('Submitting guess from input popup:');
    console.log(guess.toString());
    console.groupEnd();
    this.guess.emit(guess);
  }

  closePopup() {
    console.log('Closing GuessInputPopup');
    this.close.emit();
  }

  foundAnswer() {
    console.log('GuessInputPopup found answer!');
    this.colors = 'ggggg';
  }
}
