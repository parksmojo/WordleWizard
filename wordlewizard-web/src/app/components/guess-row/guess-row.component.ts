import { Component, Input } from '@angular/core';
import { Colors, Guess } from 'wordlewizard-shared';

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
