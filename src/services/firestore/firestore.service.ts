import { inject, Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Guess } from '../../model/guess/guess';
import { UserStats } from '../../model/user-stats/user-stats';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firebaseService = inject(FirebaseService);
  private db = this.firebaseService.db;

  private readonly userStatsCollection = collection(this.db, 'userStats');

  public async getUserStats(user: User): Promise<UserStats> {
    const docRef = doc(this.userStatsCollection, user.uid);
    const docSnap = await getDoc(docRef);
    let stats: UserStats = docSnap.exists()
      ? (docSnap.data() as UserStats)
      : { uid: user.uid, username: user.displayName!, guesses: [] };
    return stats;
  }

  public async saveUserStats(userStats: UserStats): Promise<void> {
    const docRef = doc(this.userStatsCollection, userStats.uid);
    await setDoc(docRef, userStats);
  }

  public async saveGuess(user: User, guess: Guess): Promise<void> {
    const userStats = await this.getUserStats(user);
    const guessIndex = userStats.guesses.findIndex(
      (g) => g.word === guess.word
    );
    if (guessIndex !== -1) {
      userStats.guesses[guessIndex].count++;
      userStats.guesses[guessIndex].score += guess.score;
      userStats.guesses[guessIndex].guessNumber += guess.guessNumber;
    } else {
      userStats.guesses.push({
        word: guess.word,
        score: guess.score,
        guessNumber: guess.guessNumber,
        count: 1,
      });
    }
    userStats.guesses.sort((a, b) => b.score / b.count - a.score / a.count);
    await this.saveUserStats(userStats);
  }
}
