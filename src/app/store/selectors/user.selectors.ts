import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/app.state';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectSearchTerm = createSelector(
  selectUserState,
  (state: UserState) => state.searchTerm
);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectSearchTerm,
  (users, searchTerm) => {
    if (!searchTerm) {
      return users;
    }
    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.company.name.toLowerCase().includes(term)
    );
  }
);
