import {
  Colors,
  Filter,
  getPossibleAnswers,
  getPossibleGuesses,
  Guess,
} from 'wordlewizard-shared';

export class WordList {
  // Raw lists
  private _allPossibleGuesses: string[];
  private _allPossibleAnswers: string[];

  // Filters
  private _filters: Filter[] = [];

  // Filtered lists
  private _possibleGuesses: string[] = [];
  private _possibleAnswers: string[] = [];

  // Helpful info
  private _helpfulLetters: string[] = [];
  private _helpfulWords: string[] = [];

  constructor() {
    this._allPossibleGuesses = getPossibleGuesses();
    this._allPossibleAnswers = getPossibleAnswers();
    this.reset();
  }

  public reset() {
    this._filters = [];
    this._possibleGuesses = [...this._allPossibleGuesses];
    this._possibleAnswers = [...this._allPossibleAnswers];
    this._helpfulLetters = this.findHelpfulLetters();
    this._helpfulWords = this.findHelpfulWords();
  }

  get possibleGuesses(): string[] {
    return this._possibleGuesses;
  }

  get possibleAnswers(): string[] {
    return this._possibleAnswers;
  }

  get helpfulWords(): string[] {
    return this._helpfulWords;
  }

  get helpfulLetters(): string[] {
    return this._helpfulLetters;
  }

  public filterByGuess(guess: Guess): void {
    this.addFilters(Filter.fromGuess(guess));
    this._possibleGuesses = this.applyFiltersTo(this._allPossibleGuesses);
    this._possibleAnswers = this.applyFiltersTo(this._allPossibleAnswers);
    this._helpfulLetters = this.findHelpfulLetters();
    this._helpfulWords = this.findHelpfulWords();
  }

  private addFilters(filters: Filter[]): void {
    for (let filter of filters) {
      const existingIndex = this._filters.findIndex(
        (char) => char.character === filter.character
      );
      if (existingIndex >= 0) {
        if (this._filters[existingIndex].color == Colors.yellow) {
          if (filter.color === Colors.green) {
            this._filters[existingIndex] = filter;
          } else if (filter.color === Colors.yellow) {
            this._filters.push(filter);
          }
        }
      } else {
        this._filters.push(filter);
      }
    }
  }

  private applyFiltersTo(words: string[], filters?: Filter[]): string[] {
    filters ??= this._filters;
    const filteredWords = words.filter((word) => {
      for (let filter of filters) {
        if (!filter.matches(word)) {
          return false;
        }
      }
      return true;
    });
    return filteredWords;
  }

  private findHelpfulLetters(numLetters?: number): string[] {
    numLetters ??= 5;
    const checkedLetters = new Set(
      this._filters.map((filter) => filter.character)
    );
    const letterCounts = new Map();
    for (let word of this._possibleAnswers) {
      const letterArray = word.split('');
      const filteredArray = letterArray.filter(
        (letter) => !checkedLetters.has(letter)
      );
      const letters = new Set(filteredArray);
      for (let letter of letters) {
        letterCounts.set(
          letter,
          letterCounts.get(letter) ? letterCounts.get(letter) + 1 : 1
        );
      }
    }
    const sortedArray = Array.from(letterCounts.entries()).sort(
      ([, countA], [, countB]) => countB - countA
    );
    return sortedArray.slice(0, numLetters).map(([letter, count]) => letter);
  }

  private findHelpfulWords(numWords?: number): string[] {
    numWords ??= 15;
    const filters = this._helpfulLetters.map(
      (letter) => new Filter(letter, 0, Colors.orange)
    );
    const allWords = [];
    while (allWords.length < numWords && filters.length > 0) {
      allWords.push(...this.applyFiltersTo(this._allPossibleGuesses, filters));
      filters.pop();
    }
    const uniqueWords = new Set<string>(allWords);
    return Array.from(uniqueWords).slice(0, numWords);
  }
}
