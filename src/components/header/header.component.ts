import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstructionsComponent } from '../instructions/instructions.component';
import { SettingsComponent } from '../settings/settings.component';
import { StatsComponent } from '../stats/stats.component';
import { HomeService } from '../../presenters/home/home.service';

@Component({
  selector: 'app-header',
  imports: [InstructionsComponent, SettingsComponent, StatsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showMenu = false;

  constructor(protected route: Router, protected presenter: HomeService) {}

  goAbout() {
    console.log('HeaderComponent: Navigating to /about');
    this.showMenu = false;
    this.route.navigate(['/about']);
  }
}
