import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Output() complete = new EventEmitter<void>();
  @ViewChild('textInput') inputElement!: ElementRef;

  constructor(private authService: AuthService) {
    console.log('RegisterComponent initialized');
  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(18),
      Validators.pattern(/^[a-zA-Z0-9_@-]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  isFormDirty(): boolean {
    return Object.values(this.registerForm.controls).every(
      (control) => control.touched || control.dirty
    );
  }

  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }

  async register() {
    if (!this.registerForm.valid) {
      throw new Error('Form incomplete');
    }
    this.registerForm.disable();
    await this.authService.register(
      this.registerForm.value.email!,
      this.registerForm.value.username!,
      this.registerForm.value.password!
    );
    this.complete.emit();
  }
}
