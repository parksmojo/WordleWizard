import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from '../../components/auth/auth.component';
import packageJson from '../../../package.json';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-about',
  imports: [AuthComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  version = packageJson.version;
  constructor(protected route: Router, protected authService: AuthService) {}
}
