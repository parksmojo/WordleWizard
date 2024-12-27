export class Guess {
  private _word: string;
  private _colors: string;
  private _score: number;
  private colorCheck = new RegExp(`^[bgy]{5}$`);
  private answerCheck = new RegExp(`^[g]{5}$`);

  constructor(guess: string, colors: string) {
    if (guess.length != 5) {
      throw new Error("Guess input of wrong length");
    }
    if (!this.colorCheck.test(colors)) {
      throw new Error("Colors input incorrectly");
    }
    this._word = guess.toLowerCase();
    this._colors = colors;
    this._score = this.answerCheck.test(colors) ? 0 : this.calcScore(colors);
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
