import { Component, Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  @Input() show: boolean = false;
  register: boolean = false;

  closePopup() {
    this.show = false;
    document.body.classList.remove('no-scroll');
  }
  openPopup() {
    this.show = true;
    document.body.classList.add('no-scroll');
  }
}
