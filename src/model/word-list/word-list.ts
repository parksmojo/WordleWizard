import { getPossibleAnswers } from '../../../resources/PossibleAnswers';
import { getPossibleGuesses } from '../../../resources/PossibleGuesses';
import { Colors } from '../colors/colors';
import { Filter } from '../filter/filter';
import { Guess } from '../guess/guess';

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
    console.log('WordList object created');
    this._allPossibleGuesses = getPossibleGuesses();
    this._allPossibleAnswers = getPossibleAnswers();
    this.reset();
  }

  public reset() {
    console.log('WordList reset');
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
    console.log('WordList filtering by guess: ' + guess);
    this.addFilters(Filter.fromGuess(guess));
    this._possibleGuesses = this.applyFiltersTo(this._allPossibleGuesses);
    this._possibleAnswers = this.applyFiltersTo(this._allPossibleAnswers);
    this._helpfulLetters = this.findHelpfulLetters();
    this._helpfulWords = this.findHelpfulWords();
  }

  private addFilters(filters: Filter[]): void {
    console.groupCollapsed('WordList adding filters');
    for (const newFilter of filters) {
      console.group('WordList checking ' + newFilter);
      const existingIndex = this._filters.findIndex(
        (char) => char.character === newFilter.character
      );
      if (existingIndex === -1) {
        console.log('Adding filter');
        this._filters.push(newFilter);
        console.groupEnd();
        continue;
      }

      console.log(`Dupe '${newFilter.character.toUpperCase()}' filter`);
      const oldFilter = this._filters[existingIndex];

      // Re-entered filter
      if (oldFilter.equals(newFilter)) {
        console.log('Filter already exists');

        // Same color, different position
      } else if (
        oldFilter.color === newFilter.color &&
        oldFilter.position !== newFilter.position &&
        oldFilter.color !== Colors.black
      ) {
        console.log('Is new position');
        this._filters.push(newFilter);

        // Yellows and greens can be complementary
      } else if (
        oldFilter.color !== Colors.black &&
        newFilter.color !== Colors.black
      ) {
        console.log('More info');
        this._filters.push(newFilter);

        // Replace black and ensure no repeats
      } else if (
        oldFilter.color === Colors.black &&
        newFilter.color !== Colors.black
      ) {
        console.log('Replacing black');
        this._filters[existingIndex] = newFilter;
        // ensure no repeats

        // Yellow then Black means no repeats and not there
      } else if (
        oldFilter.color === Colors.yellow &&
        newFilter.color === Colors.black
      ) {
        this._filters.push(
          new Filter(newFilter.character, newFilter.position, Colors.yellow)
        );
        // ensure no repeats

        // Green then Black means no repeats
      } else if (
        oldFilter.color === Colors.green &&
        newFilter.color === Colors.black
      ) {
        for (let i = 0; i < 5; i++) {
          if (i !== oldFilter.position) {
            this._filters.push(
              new Filter(oldFilter.character, i, Colors.yellow)
            );
          }
        }
      }

      console.groupEnd();
    }
    console.groupEnd();
  }

  private applyFiltersTo(words: string[], filters?: Filter[]): string[] {
    console.groupCollapsed(
      'WordList applying filters to a list beginning with:',
      words[0]
    );
    filters ??= this._filters;
    const filteredWords = words.filter((word) => {
      for (const filter of filters) {
        if (!filter.matches(word)) {
          return false;
        }
      }
      return true;
    });
    console.log(
      `Filtered from ${words.length} words to ${filteredWords.length} words`
    );
    console.groupEnd();
    return filteredWords;
  }

  private findHelpfulLetters(numLetters?: number): string[] {
    console.log('WordList finding helpful letters');
    numLetters ??= 5;
    const checkedLetters = new Set(
      this._filters.map((filter) => filter.character)
    );
    const letterCounts = new Map();
    for (const word of this._possibleAnswers) {
      const letterArray = word.split('');
      const filteredArray = letterArray.filter(
        (letter) => !checkedLetters.has(letter)
      );
      const letters = new Set(filteredArray);
      for (const letter of letters) {
        letterCounts.set(
          letter,
          letterCounts.get(letter) ? letterCounts.get(letter) + 1 : 1
        );
      }
    }
    const sortedArray = Array.from(letterCounts.entries()).sort(
      ([, countA], [, countB]) => countB - countA
    );
    return sortedArray.slice(0, numLetters).map(([letter]) => letter);
  }

  private findHelpfulWords(numWords?: number): string[] {
    console.log('WordList finding helpful words');
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

  toString(): string {
    return `WordList: 
  - ${this._possibleGuesses.length} possible guesses
  - ${this._possibleAnswers.length} possible answers
  - ${this._helpfulWords.length} helpful words
  - ${this._filters.length} filters: 
    - ${this._filters.join('\n    - ')}`;
  }
}
