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

  openPopup() {
    console.log('Opening Auth popup');
    this.show = true;
    document.body.classList.add('no-scroll');
  }
  closePopup() {
    console.log('Closing Auth popup');
    this.show = false;
    document.body.classList.remove('no-scroll');
  }
}
