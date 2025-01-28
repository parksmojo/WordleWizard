export interface UserStats {
  uid: string;
  username: string;
  guesses: GuessStats[];
}

export interface GuessStats {
  word: string;
  score: number;
  guessNumber: number;
  count: number;
}
