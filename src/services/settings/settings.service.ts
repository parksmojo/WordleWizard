import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _statResultCount = 10;

  constructor() {
    this.statResultCount = localStorage.getItem('statResultCount')
      ? parseInt(localStorage.getItem('statResultCount')!)
      : this.statResultCount;
  }

  get statResultCount(): number {
    return this._statResultCount;
  }

  set statResultCount(value: number) {
    if (value < 3) {
      throw new Error('statResultCount must be at least 3');
    } else if (value > 30) {
      throw new Error('statResultCount must be less than 30');
    }
    this._statResultCount = value;
  }
}
