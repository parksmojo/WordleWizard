export class Guess {
  private _word: string;
  private _colors: string;
  private _score: number;
  private wordFormat = /^[a-z]{5}$/i;
  private colorFormat = /^[bgy]{5}$/i;
  private answerFormat = /^[g]{5}$/i;

  constructor(guess: string, colors: string) {
    if (!this.wordFormat.test(guess)) {
      throw new Error("Guess input of wrong length");
    }
    if (!this.colorFormat.test(colors)) {
      throw new Error("Colors input incorrectly");
    }
    this._word = guess.toLowerCase();
    this._colors = colors.toLowerCase();
    this._score = this.answerFormat.test(colors) ? 0 : this.calcScore(this._colors);
  }

  private calcScore(colors: string) {
    let score = 0;
    for (let color of colors.split("")) {
      switch (color) {
        case "y":
          score += 1;
          break;
        case "g":
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
    return this._word.split("");
  }

  public get colors() {
    return this._colors.split("");
  }

  public get score() {
    return this._score;
  }
}
