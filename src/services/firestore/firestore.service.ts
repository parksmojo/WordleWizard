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
    console.log(`DB getting stats for: ${user.displayName}(${user.uid})`);
    const docRef = doc(this.userStatsCollection, user.uid);
    const docSnap = await getDoc(docRef);
    const stats: UserStats = docSnap.exists()
      ? (docSnap.data() as UserStats)
      : { uid: user.uid, username: user.displayName!, guesses: [] };
    return stats;
  }

  private async saveUserStats(userStats: UserStats): Promise<void> {
    console.log(
      `DB uploading stats for user: ${userStats.username}(${userStats.uid})`
    );
    const docRef = doc(this.userStatsCollection, userStats.uid);
    await setDoc(docRef, userStats);
  }

  public async saveGuess(user: User, guess: Guess): Promise<void> {
    if (guess.score === 10) {
      console.log(
        'Not saving answer for user: ' + user.displayName + `(${user.uid})`
      );
      return;
    }
    console.log(
      'DB saving guess: ' +
        guess +
        ' for user: ' +
        user.displayName +
        `(${user.uid})`
    );
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
    await this.saveUserStats(userStats);
  }
}
