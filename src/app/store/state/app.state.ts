import { User } from '../../core/models/user.model';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  filteredUsers?: User[] | null;
  loading: boolean;
  error: any;
  searchTerm: string;
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  searchTerm: ''
};

export interface AppState {
  users: UserState;
  theme: ThemeState;
}

export interface ThemeState {
  isDarkMode: boolean;
}

export const initialThemeState: ThemeState = {
  isDarkMode: false
};
