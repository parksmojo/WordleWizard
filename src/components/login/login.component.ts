import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() complete = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  async login() {
    if (!this.loginForm.valid) {
      throw new Error('Form incomplete');
    }
    this.loginForm.disable();
    await this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
    this.complete.emit();
  }
}
