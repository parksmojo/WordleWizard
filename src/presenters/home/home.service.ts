import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Guess } from '../../model/guess/guess';
import { UserStats } from '../../model/user-stats/user-stats';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private auth = inject(AuthService);
  private db = inject(FirestoreService);

  public isSignedIn() {
    return this.auth.isSignedIn();
  }

  public async recordGuess(guess: Guess): Promise<void> {
    const user = this.auth.getCurrentUser();
    if (!user) {
      return;
    }
    await this.db.saveGuess(user, guess);
  }

  public async getStats(): Promise<UserStats> {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw new Error('Logged out user tried to get stats');
    }
    return await this.db.getUserStats(user);
  }
}
