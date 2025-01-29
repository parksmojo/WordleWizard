import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import packageJson from '../../../package.json';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  imports: [MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  @Input() show: boolean = false;
  @Output() complete = new EventEmitter<void>();
  canLogout: boolean = false;
  version = packageJson.version;

  constructor(private authService: AuthService) {}

  closePopup() {
    console.log('Closing Settings popup');
    this.show = false;
    document.body.classList.remove('no-scroll');
  }
  openPopup() {
    console.log('Opening Settings popup');
    this.canLogout = this.authService.isSignedIn();
    this.show = true;
    document.body.classList.add('no-scroll');
  }

  async logout() {
    console.log('Logging out from settings popup');
    await this.authService.logout();
    this.canLogout = false;
    this.closePopup();
    this.complete.emit();
  }
}
