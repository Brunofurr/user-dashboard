import { createAction } from '@ngrx/store';

export const toggleTheme = createAction('[Theme] Toggle Theme');
export const setDarkMode = createAction('[Theme] Set Dark Mode');
export const setLightMode = createAction('[Theme] Set Light Mode');
