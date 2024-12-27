import { Component, Input } from '@angular/core';
import { Guess } from 'wordlebuddy-shared';

@Component({
  selector: 'app-guess-row',
  imports: [],
  templateUrl: './guess-row.component.html',
  styleUrl: './guess-row.component.css',
})
export class GuessRowComponent {
  @Input() guess: Guess = new Guess('tales', 'bbbbb');

  getColor(colorCode: string): string {
    const colorMap: { [key: string]: string } = {
      b: '#3a3a3c',
      y: '#b59f3b',
      g: '#538d4e',
    };
    return colorMap[colorCode] || 'red';
  }
}
