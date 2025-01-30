import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Guess } from '../../model/guess/guess';
import { User } from 'firebase/auth';

describe('HomeService', () => {
  let service: HomeService;
  let authSpy: jasmine.SpyObj<AuthService>;
  let dbSpy: jasmine.SpyObj<FirestoreService>;

  const fakeGuess: Guess = { word: 'abcde' } as Guess;
  const fakeUser: User = { displayName: 'user' } as User;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isSignedIn',
      'getCurrentUser',
    ]);
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', [
      'saveGuess',
      'getUserStats',
    ]);

    TestBed.configureTestingModule({
      providers: [
        HomeService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: FirestoreService, useValue: firestoreServiceSpy },
      ],
    });
    service = TestBed.inject(HomeService);
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dbSpy = TestBed.inject(
      FirestoreService
    ) as jasmine.SpyObj<FirestoreService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use AuthService', () => {
    authSpy.isSignedIn.and.returnValue(false);
    expect(service.isSignedIn()).toBe(false);
    expect(authSpy.isSignedIn.calls.count()).toBe(1);

    authSpy.isSignedIn.and.returnValue(true);
    expect(service.isSignedIn()).toBe(true);
    expect(authSpy.isSignedIn.calls.count()).toBe(2);
  });

  it('should not record guess without user', async () => {
    authSpy.getCurrentUser.and.returnValue(null);

    await service.recordGuess(fakeGuess);
    expect(authSpy.getCurrentUser.calls.count()).toBe(1);
    expect(dbSpy.saveGuess.calls.count()).toBe(0);
  });

  it('should not get stats without user', async () => {
    authSpy.getCurrentUser.and.returnValue(null);

    await expectAsync(service.getStats()).toBeRejectedWithError();
    expect(authSpy.getCurrentUser.calls.count()).toBe(1);
    expect(dbSpy.getUserStats.calls.count()).toBe(0);
  });

  it('should save the guess', async () => {
    authSpy.getCurrentUser.and.returnValue(fakeUser);

    await service.recordGuess(fakeGuess);
    expect(authSpy.getCurrentUser.calls.count()).toBe(1);
    expect(dbSpy.saveGuess.calls.count()).toBe(1);
    expect(dbSpy.saveGuess.calls.mostRecent().args).toContain(fakeUser);
    expect(dbSpy.saveGuess.calls.mostRecent().args).toContain(fakeGuess);
  });

  it('should get stats', async () => {
    authSpy.getCurrentUser.and.returnValue(fakeUser);

    await service.getStats();
    expect(authSpy.getCurrentUser.calls.count()).toBe(1);
    expect(dbSpy.getUserStats.calls.count()).toBe(1);
    expect(dbSpy.getUserStats.calls.mostRecent().args).toContain(fakeUser);
  });
});
