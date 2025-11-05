import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from '../actions/theme.actions';
import { initialThemeState } from '../state/app.state';

export const themeReducer = createReducer(
  initialThemeState,
  on(ThemeActions.toggleTheme, state => ({
    ...state,
    isDarkMode: !state.isDarkMode
  })),
  on(ThemeActions.setDarkMode, state => ({
    ...state,
    isDarkMode: true
  })),
  on(ThemeActions.setLightMode, state => ({
    ...state,
    isDarkMode: false
  }))
);
