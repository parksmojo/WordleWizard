import { Component } from '@angular/core';
import { GuessBoardComponent } from '../guess-board/guess-board.component';

@Component({
  selector: 'app-home',
  imports: [GuessBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
