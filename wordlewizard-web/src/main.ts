import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpWDz-i8vGRVVJkiurDqinj2WraZrwgOU',
  authDomain: 'wordle-wizard.firebaseapp.com',
  projectId: 'wordle-wizard',
  storageBucket: 'wordle-wizard.firebasestorage.app',
  messagingSenderId: '1037865245539',
  appId: '1:1037865245539:web:7aaf2cbd2696d7b5be1156',
  measurementId: 'G-QVQ3VQRBWN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
