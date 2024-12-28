import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-helpful',
  imports: [],
  templateUrl: './helpful.component.html',
  styleUrl: './helpful.component.css',
})
export class HelpfulComponent {
  @Input() words: string[] = [];
  @Input() letters: string[] = [];
}
