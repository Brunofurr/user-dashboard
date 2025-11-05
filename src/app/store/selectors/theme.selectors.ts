import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from '../state/app.state';

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectIsDarkMode = createSelector(
  selectThemeState,
  (state: ThemeState) => state.isDarkMode
);
