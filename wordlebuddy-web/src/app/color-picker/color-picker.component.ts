import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Colors, Guess } from 'wordlebuddy-shared';

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
    return Colors.get(colorCode).hex;
  }

  nextColor(index: number): void {
    this.colors[index] = Colors.get(this.colors[index]).next;
    this.submitColors();
  }

  submitColors(): void {
    this.colorString.emit(this.colors.join(''));
  }
}
