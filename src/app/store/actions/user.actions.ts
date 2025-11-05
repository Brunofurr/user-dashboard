import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const selectUser = createAction(
  '[User] Select User',
  props<{ userId: number }>()
);

export const selectUserSuccess = createAction(
  '[User] Select User Success',
  props<{ user: User }>()
);

export const selectUserFailure = createAction(
  '[User] Select User Failure',
  props<{ error: any }>()
);

export const clearSelectedUser = createAction('[User] Clear Selected User');

export const setSearchTerm = createAction(
  '[User] Set Search Term',
  props<{ searchTerm: string }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

export const loadLocalUsers = createAction('[User] Load Local Users');
