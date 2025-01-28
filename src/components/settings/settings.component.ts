import { Component, Input } from '@angular/core';
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
  canLogout: boolean = false;
  version = packageJson.version;

  constructor(private authService: AuthService) {
    if (authService.isSignedIn()) {
      this.canLogout = true;
    }
  }

  closePopup() {
    this.show = false;
    document.body.classList.remove('no-scroll');
  }
  openPopup() {
    this.show = true;
    document.body.classList.add('no-scroll');
  }

  async logout() {
    await this.authService.logout();
    this.canLogout = false;
    this.closePopup();
  }
}
