export declare class Guess {
    private _word;
    private _colors;
    private _score;
    private colorCheck;
    private answerCheck;
    constructor(guess: string, colors: string);
    private calcScore;
    get word(): string;
    get letters(): string[];
    get colors(): string[];
    get score(): number;
}
