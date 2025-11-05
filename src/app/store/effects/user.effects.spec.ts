import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { UserEffects } from './user.effects';
import { UserService } from '../../core/services/user.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import * as UserActions from '../actions/user.actions';
import { User } from '../../core/models/user.model';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let testScheduler: TestScheduler;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'City',
      zipcode: '12345',
      geo: { lat: '0', lng: '0' }
    },
    phone: '1234567890',
    website: 'john.com',
    company: {
      name: 'Company Inc',
      catchPhrase: 'Catch phrase',
      bs: 'BS'
    }
  };

  const mockUser2: User = {
    ...mockUser,
    id: 2,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@example.com'
  };

  const mockUsers: User[] = [mockUser, mockUser2];

  const editedUser: User = {
    ...mockUser,
    name: 'John Edited',
    email: 'john.edited@example.com'
  };

  const editedUsersMap = {
    1: editedUser
  };

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'getUserById']);
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'loadEditedUsers', 
      'saveEditedUser', 
      'getEditedUser'
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: userServiceSpy },
        { provide: LocalStorageService, useValue: localStorageSpy }
      ]
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('loadUsers$', () => {
    it('should return loadUsersSuccess action with users', (done) => {
      userService.getUsers.and.returnValue(of(mockUsers));
      localStorageService.loadEditedUsers.and.returnValue({});
      actions$ = of(UserActions.loadUsers());

      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.loadUsersSuccess({ users: mockUsers }));
        expect(userService.getUsers).toHaveBeenCalled();
        expect(localStorageService.loadEditedUsers).toHaveBeenCalled();
        done();
      });
    });

    it('should merge edited users from localStorage', (done) => {
      userService.getUsers.and.returnValue(of(mockUsers));
      localStorageService.loadEditedUsers.and.returnValue(editedUsersMap);
      actions$ = of(UserActions.loadUsers());

      const expectedUsers = [editedUser, mockUser2];

      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.loadUsersSuccess({ users: expectedUsers }));
        expect(localStorageService.loadEditedUsers).toHaveBeenCalled();
        done();
      });
    });

    it('should return loadUsersFailure action on error', (done) => {
      const error = new Error('Error loading users');
      userService.getUsers.and.returnValue(throwError(() => error));
      localStorageService.loadEditedUsers.and.returnValue({});
      actions$ = of(UserActions.loadUsers());

      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.loadUsersFailure({ error }));
        expect(userService.getUsers).toHaveBeenCalled();
        done();
      });
    });

    it('should handle empty users array', (done) => {
      userService.getUsers.and.returnValue(of([]));
      localStorageService.loadEditedUsers.and.returnValue({});
      actions$ = of(UserActions.loadUsers());

      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.loadUsersSuccess({ users: [] }));
        done();
      });
    });

    it('should handle localStorage error and continue with users', (done) => {
      userService.getUsers.and.returnValue(of(mockUsers));
      localStorageService.loadEditedUsers.and.returnValue({});
      actions$ = of(UserActions.loadUsers());

      effects.loadUsers$.subscribe({
        next: (action) => {
          expect(action).toEqual(UserActions.loadUsersSuccess({ users: mockUsers }));
          done();
        },
        error: () => {
          fail('Should not error');
          done();
        }
      });
    });
  });

  describe('selectUser$', () => {
    it('should return selectUserSuccess action with user', (done) => {
      userService.getUserById.and.returnValue(of(mockUser));
      localStorageService.getEditedUser.and.returnValue(null);
      actions$ = of(UserActions.selectUser({ userId: 1 }));

      effects.selectUser$.subscribe(action => {
        expect(action).toEqual(UserActions.selectUserSuccess({ user: mockUser }));
        expect(userService.getUserById).toHaveBeenCalledWith(1);
        expect(localStorageService.getEditedUser).toHaveBeenCalledWith(1);
        done();
      });
    });

    it('should return edited user from localStorage if exists', (done) => {
      userService.getUserById.and.returnValue(of(mockUser));
      localStorageService.getEditedUser.and.returnValue(editedUser);
      actions$ = of(UserActions.selectUser({ userId: 1 }));

      effects.selectUser$.subscribe(action => {
        expect(action).toEqual(UserActions.selectUserSuccess({ user: editedUser }));
        expect(localStorageService.getEditedUser).toHaveBeenCalledWith(1);
        done();
      });
    });

    it('should return selectUserFailure action on error', (done) => {
      const error = new Error('User not found');
      userService.getUserById.and.returnValue(throwError(() => error));
      localStorageService.getEditedUser.and.returnValue(null);
      actions$ = of(UserActions.selectUser({ userId: 999 }));

      effects.selectUser$.subscribe(action => {
        expect(action).toEqual(UserActions.selectUserFailure({ error }));
        expect(userService.getUserById).toHaveBeenCalledWith(999);
        done();
      });
    });

    it('should use original user when localStorage fails', (done) => {
      userService.getUserById.and.returnValue(of(mockUser));
      localStorageService.getEditedUser.and.returnValue(null);
      actions$ = of(UserActions.selectUser({ userId: 1 }));

      effects.selectUser$.subscribe({
        next: (action) => {
          expect(action).toEqual(UserActions.selectUserSuccess({ user: mockUser }));
          done();
        },
        error: () => {
          fail('Should not error');
          done();
        }
      });
    });
  });

  describe('updateUser$', () => {
    it('should save user to localStorage and return updateUserSuccess', (done) => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      localStorageService.saveEditedUser.and.stub();
      actions$ = of(UserActions.updateUser({ user: updatedUser }));

      effects.updateUser$.subscribe(action => {
        expect(action).toEqual(UserActions.updateUserSuccess({ user: updatedUser }));
        expect(localStorageService.saveEditedUser).toHaveBeenCalledWith(updatedUser);
        done();
      });
    });

    it('should return updateUserSuccess even if localStorage save fails', (done) => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      localStorageService.saveEditedUser.and.stub();
      actions$ = of(UserActions.updateUser({ user: updatedUser }));

      effects.updateUser$.subscribe({
        next: (action) => {
          expect(action).toEqual(UserActions.updateUserSuccess({ user: updatedUser }));
          done();
        },
        error: () => {
          fail('Should not error');
          done();
        }
      });
    });

    it('should handle multiple updates in sequence', (done) => {
      const updates: User[] = [
        { ...mockUser, name: 'Update 1' },
        { ...mockUser2, name: 'Update 2' }
      ];
      
      localStorageService.saveEditedUser.and.stub();
      actions$ = of(
        UserActions.updateUser({ user: updates[0] }),
        UserActions.updateUser({ user: updates[1] })
      );

      const results: any[] = [];
      effects.updateUser$.subscribe({
        next: (action) => {
          results.push(action);
          if (results.length === 2) {
            expect(results[0]).toEqual(UserActions.updateUserSuccess({ user: updates[0] }));
            expect(results[1]).toEqual(UserActions.updateUserSuccess({ user: updates[1] }));
            expect(localStorageService.saveEditedUser).toHaveBeenCalledTimes(2);
            done();
          }
        }
      });
    });
  });

  describe('Integration tests', () => {
    it('should handle full flow: load, select, update', (done) => {
      userService.getUsers.and.returnValue(of(mockUsers));
      userService.getUserById.and.returnValue(of(mockUser));
      localStorageService.loadEditedUsers.and.returnValue({});
      localStorageService.getEditedUser.and.returnValue(null);
      localStorageService.saveEditedUser.and.stub();

      const actionsFlow = [
        UserActions.loadUsers(),
        UserActions.selectUser({ userId: 1 }),
        UserActions.updateUser({ user: editedUser })
      ];

      actions$ = of(...actionsFlow);

      let loadUsersComplete = false;
      let selectUserComplete = false;
      let updateUserComplete = false;

      effects.loadUsers$.subscribe(action => {
        if (action.type === '[User] Load Users Success') {
          loadUsersComplete = true;
        }
      });

      effects.selectUser$.subscribe(action => {
        if (action.type === '[User] Select User Success') {
          selectUserComplete = true;
        }
      });

      effects.updateUser$.subscribe(action => {
        if (action.type === '[User] Update User Success') {
          updateUserComplete = true;
          expect(loadUsersComplete).toBe(true);
          expect(selectUserComplete).toBe(true);
          expect(updateUserComplete).toBe(true);
          done();
        }
      });
    });
  });

  it('should properly inject dependencies using inject()', () => {
    expect(effects).toBeTruthy();
    expect(effects['userService']).toBeTruthy();
    expect(effects['localStorageService']).toBeTruthy();
    expect(effects['actions$']).toBeTruthy();
  });
});