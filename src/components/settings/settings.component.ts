import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-settings',
  imports: [MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  @Input() show: boolean = false;
  version = packageJson.version;

  closePopup() {
    this.show = false;
  }
  openPopup() {
    this.show = true;
  }

  logout() {
    throw new Error('Method not implemented.');
  }
}
