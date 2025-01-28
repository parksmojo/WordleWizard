import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Guess } from '../../model/guess/guess';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private auth = inject(AuthService);
  private db = inject(FirestoreService);

  public async recordGuess(guess: Guess): Promise<void> {
    const user = this.auth.getCurrentUser();
    if (!user) {
      return;
    }

    await this.db.saveGuess(user, guess);
  }
}
