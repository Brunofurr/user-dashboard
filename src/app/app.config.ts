import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { userReducer } from './store/reducers/user.reducer';
import { themeReducer } from './store/reducers/theme.reducer';
import { UserEffects } from './store/effects/user.effects';
import { headersInterceptor, errorInterceptor, loggingInterceptor } from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        headersInterceptor,
        loggingInterceptor,
        errorInterceptor,
      ])
    ),
    provideStore({
      users: userReducer,
      theme: themeReducer
    }),
    provideEffects([UserEffects]),
    ...(isDevMode() ? [provideStoreDevtools({ maxAge: 25 })] : [])
  ]
};
