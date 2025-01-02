import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showMenu = false;

  constructor(protected route: Router) {}

  openMenu() {
    this.showMenu = true;
    document.body.classList.add('no-scroll');
  }

  closeMenu() {
    this.showMenu = false;
    document.body.classList.remove('no-scroll');
  }

  goHome() {
    this.showMenu = false;
    this.route.navigate(['/home']);
  }

  goAbout() {
    this.showMenu = false;
    this.route.navigate(['/about']);
  }
}
