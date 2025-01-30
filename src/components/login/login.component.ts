import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('textInput') inputElement!: ElementRef;
  failed = false;

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent initialized');
  }

  ngAfterViewInit() {
    console.log('LoginComponent view initialized');
    this.inputElement.nativeElement.focus();
  }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  async login() {
    console.log('LoginComponent login called');
    this.failed = false;
    if (!this.loginForm.valid) {
      throw new Error('Form incomplete');
    }
    this.loginForm.disable();
    try {
      await this.authService.login(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      );
    } catch (e) {
      console.error(e);
      this.loginForm.enable();
      this.failed = true;
      this.loginForm.reset();
      return;
    }
    this.router.navigate(['/home']);
  }
}
