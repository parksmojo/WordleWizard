import { Guess } from '../guess/guess';
import { WordList } from './word-list';

describe('WordList', () => {
  let list: WordList;

  beforeEach(() => {
    list = new WordList();
  });

  it('should create an instance', () => {
    expect(list).toBeTruthy();
  });

  it('should filter new yellows correctly', () => {
    list.filterByGuess(new Guess('spark', 'yybyb', 1));
    list.filterByGuess(new Guess('ports', 'ybyby', 2));
    expect(list.possibleGuesses).toContain('crisp');
    expect(list.possibleGuesses.length).toBe(1);
  });
});
