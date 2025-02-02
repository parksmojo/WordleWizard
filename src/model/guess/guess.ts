import { Colors } from '../colors/colors';

export class Guess {
  private _word: string;
  private _colors: string;
  private _score: number;
  private _guessNumber: number;

  public static readonly wordFormat = /^[a-z]{5}$/i;
  public static readonly colorFormat = /^[bgy]{5}$/i;

  constructor(guess: string, colors: string, guessNumber: number) {
    if (!Guess.wordFormat.test(guess)) {
      throw new Error('Guess input of wrong length');
    }
    if (!Guess.colorFormat.test(colors)) {
      throw new Error('Colors input incorrectly');
    }
    if (guessNumber < 1 || guessNumber > 6) {
      throw new Error('Guess number out of range');
    }
    this._word = guess.toLowerCase();
    this._colors = colors.toLowerCase();
    this._score = this.calcScore(this._colors);
    this._guessNumber = guessNumber;
    console.log('Guess object created: ' + this);
  }

  private calcScore(colors: string) {
    let score = 0;
    for (const color of colors.split('')) {
      switch (color) {
        case Colors.yellow:
          score += 1;
          break;
        case Colors.green:
          score += 2;
          break;
      }
    }
    return score;
  }

  public get word() {
    return this._word;
  }

  public get letters() {
    return this._word.split('');
  }

  public get colors() {
    return this._colors.split('');
  }

  public get score() {
    return this._score;
  }

  public get guessNumber() {
    return this._guessNumber;
  }

  public toString() {
    return `Guess: 
  - '${this._word}'
  - ${this._colors}
  - ${this._score} pts
  - ${this._guessNumber}th guess`;
  }
}
