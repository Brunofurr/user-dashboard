import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { initialUserState } from '../state/app.state';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.selectUser, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.selectUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false
  })),
  on(UserActions.selectUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.clearSelectedUser, state => ({
    ...state,
    selectedUser: null
  })),
  on(UserActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm
  })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser
  }))
);
