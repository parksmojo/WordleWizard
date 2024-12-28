import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Guess } from 'wordlebuddy-shared';

@Component({
  selector: 'app-color-picker',
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css',
})
export class ColorPickerComponent {
  @Input() word: string = '';
  @Output() colorString = new EventEmitter<string>();
  colors = ['b', 'b', 'b', 'b', 'b'];

  getColor(colorCode: string): string {
    return Guess.getColorHex(colorCode);
  }

  nextColor(index: number): void {
    this.colors[index] = Guess.nextColor(this.colors[index]);
    this.submitColors();
  }

  submitColors(): void {
    this.colorString.emit(this.colors.join(''));
  }
}
