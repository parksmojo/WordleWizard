import { inject, Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseService = inject(FirebaseService);
  private auth = this.firebaseService.auth;

  public async register(
    email: string,
    username: string,
    password: string
  ): Promise<void> {
    console.log('Auth registering user with email: ' + email);
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: username });
  }

  public async login(email: string, password: string): Promise<void> {
    console.log('Auth logging in user with email: ' + email);
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  public async logout(): Promise<void> {
    console.log('Auth logging out user');
    await signOut(this.auth);
  }

  public getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  public isSignedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
