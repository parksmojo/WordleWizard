import { Component, Input } from '@angular/core';
import { Guess } from '../../model/domain/Guess';
import { Colors } from '../../model/domain/Color';

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
