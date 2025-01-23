import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstructionsComponent } from '../instructions/instructions.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  imports: [InstructionsComponent, SettingsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showMenu = false;

  constructor(protected route: Router) {}

  goHome() {
    this.showMenu = false;
    this.route.navigate(['/home']);
  }

  goAbout() {
    this.showMenu = false;
    this.route.navigate(['/about']);
  }
}
