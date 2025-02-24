import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _statResultCountName = 'statResultCount';
  private _statResultCount = 10;

  private _showOnlyAnswersName = 'showOnlyAnswers';
  private _showOnlyAnswers = false;

  constructor() {
    this.statResultCount = parseInt(this.load(this._statResultCountName, '10'));

    this.showOnlyAnswers =
      this.load(this._showOnlyAnswersName, 'false') === 'true';
  }

  private load(name: string, defaultValue: string): string {
    return localStorage.getItem(name) || defaultValue;
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
    localStorage.setItem(this._statResultCountName, value.toString());
  }

  get showOnlyAnswers(): boolean {
    return this._showOnlyAnswers;
  }

  set showOnlyAnswers(value: boolean) {
    this._showOnlyAnswers = value;
    localStorage.setItem(this._showOnlyAnswersName, value.toString());
  }
}
