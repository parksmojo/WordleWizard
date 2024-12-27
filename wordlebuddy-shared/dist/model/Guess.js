"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guess = void 0;
class Guess {
    _word;
    _colors;
    _score;
    colorCheck = new RegExp(`^[bgy]{5}$`);
    answerCheck = new RegExp(`^[g]{5}$`);
    constructor(guess, colors) {
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
    calcScore(colors) {
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
    get word() {
        return this._word;
    }
    get letters() {
        return this._word.split("");
    }
    get colors() {
        return this._colors.split("");
    }
    get score() {
        return this._score;
    }
}
exports.Guess = Guess;
