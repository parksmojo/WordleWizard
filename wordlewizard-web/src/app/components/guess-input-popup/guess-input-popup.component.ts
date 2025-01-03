import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Guess } from 'wordlewizard-shared';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-guess-input-popup',
  imports: [ReactiveFormsModule, ColorPickerComponent],
  templateUrl: './guess-input-popup.component.html',
  styleUrl: './guess-input-popup.component.css',
})
export class GuessInputPopupComponent {
  @ViewChild('textInput') inputElement!: ElementRef;
  @Input() presetGuess = '';
  @Output() close = new EventEmitter<void>();
  @Output() guess = new EventEmitter<Guess>();
  colors = 'bbbbb';

  guessForm = new FormGroup({
    word: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z]{5}\s*$/i),
    ]),
  });

  ngAfterViewInit() {
    if (this.presetGuess === '') {
      this.inputElement.nativeElement.focus();
    } else {
      this.guessForm.get('word')?.setValue(this.presetGuess);
    }
  }

  setColors(colorString: string) {
    this.colors = colorString;
  }

  submitGuess() {
    this.guess.emit(new Guess(this.guessForm.value.word!, this.colors));
  }

  closePopup() {
    this.close.emit();
  }

  foundAnswer() {
    this.colors = 'ggggg';
  }
}
