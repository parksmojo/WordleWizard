import { Colors } from '../colors/colors';
import { Guess } from '../guess/guess';

export class Filter {
  private _character: string;
  private _position: number;
  private _color: string;

  constructor(character: string, position: number, color: string) {
    this._character = character;
    this._position = position;
    this._color = color;
  }

  get character(): string {
    return this._character;
  }

  get color(): string {
    return this._color;
  }

  get position(): number {
    return this._position;
  }

  public matches(word: string): boolean {
    return Colors.get(this._color).filterMethod(
      word,
      this._character,
      this._position
    );
  }

  public static fromGuess(guess: Guess): Filter[] {
    const filters: Filter[] = [];
    for (let i = 0; i < guess.word.length; i++) {
      filters.push(new Filter(guess.word[i], i, guess.colors[i]));
    }
    return filters;
  }
}
