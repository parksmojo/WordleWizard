import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDpWDz-i8vGRVVJkiurDqinj2WraZrwgOU',
  authDomain: 'wordle-wizard.firebaseapp.com',
  projectId: 'wordle-wizard',
  storageBucket: 'wordle-wizard.firebasestorage.app',
  messagingSenderId: '1037865245539',
  appId: '1:1037865245539:web:7aaf2cbd2696d7b5be1156',
  measurementId: 'G-QVQ3VQRBWN',
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _app = initializeApp(firebaseConfig);
  private _auth = getAuth(this._app);
  private _firestore = getFirestore(this._app);

  get app() {
    return this._app;
  }

  get auth() {
    return this._auth;
  }

  get db() {
    return this._firestore;
  }
}
