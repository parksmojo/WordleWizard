import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  imports: [MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  @Input() show: boolean = false;

  closePopup() {
    this.show = false;
  }
  openPopup() {
    this.show = true;
  }
}
