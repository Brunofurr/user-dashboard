import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly localStorageService = inject(LocalStorageService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => {
            const editedUsers = this.localStorageService.loadEditedUsers();
            const mergedUsers = users.map(user =>
              editedUsers[user.id] || user
            );
            return UserActions.loadUsersSuccess({ users: mergedUsers });
          }),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      switchMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map(user => {
            const editedUser = this.localStorageService.getEditedUser(userId);
            return UserActions.selectUserSuccess({ user: editedUser || user });
          }),
          catchError(error => of(UserActions.selectUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      tap(({ user }) => {
        this.localStorageService.saveEditedUser(user);
      }),
      map(({ user }) => UserActions.updateUserSuccess({ user }))
    )
  );
}