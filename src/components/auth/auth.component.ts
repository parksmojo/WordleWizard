import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  register: boolean = false;
  @Input() show: boolean = false;

  closePopup() {
    this.show = false;
  }
  openPopup() {
    this.show = true;
  }
}
