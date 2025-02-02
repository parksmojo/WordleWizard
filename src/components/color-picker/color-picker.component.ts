import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Colors } from '../../model/colors/colors';

@Component({
  selector: 'app-color-picker',
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css',
})
export class ColorPickerComponent {
  @Input() word = '';
  @Output() colorString = new EventEmitter<string>();
  @Input() colors = ['b', 'b', 'b', 'b', 'b'];

  getColor(colorCode: string): string {
    return Colors.get(colorCode).hex;
  }

  nextColor(index: number): void {
    console.log('Next color for index:', index);
    this.colors[index] = Colors.get(this.colors[index]).next;
    this.updateColors();
  }

  updateColors(): void {
    console.log('Updating colors:', this.colors.join(''));
    this.colorString.emit(this.colors.join(''));
  }
}
