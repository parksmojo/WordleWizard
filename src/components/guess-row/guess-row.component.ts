import { Component, Input } from '@angular/core';
import { Guess } from '../../model/guess/guess';
import { Colors } from '../../model/colors/colors';

@Component({
  selector: 'app-guess-row',
  imports: [],
  templateUrl: './guess-row.component.html',
  styleUrl: './guess-row.component.css',
})
export class GuessRowComponent {
  @Input() guess: Guess = new Guess('tales', 'bbbbb');

  getColor(colorCode: string): string {
    return Colors.get(colorCode).hex;
  }
}
