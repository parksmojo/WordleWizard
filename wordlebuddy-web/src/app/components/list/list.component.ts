import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() possibleGuesses: string[] = [];
  @Input() possibleAnswers: string[] = [];

  private _showAnswers: boolean = false;
  list: string[] = [];

  @Input()
  set showAnswers(value: boolean) {
    this._showAnswers = value;
    this.updateList();
  }

  get showAnswers(): boolean {
    return this._showAnswers;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateList();
  }

  private updateList(): void {
    this.list = (
      this._showAnswers ? this.possibleAnswers : this.possibleGuesses
    ).slice(0, 100);
  }
}
