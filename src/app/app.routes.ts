import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Wordle Wizard' },
  {
    path: '',
    pathMatch: 'full',
    component: AboutComponent,
    title: 'Wordle Wizard',
  },
  { path: '**', redirectTo: '' },
];
