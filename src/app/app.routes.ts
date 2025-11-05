import { Routes } from '@angular/router';
import { ROUTE_PATHS } from './core/constants/route.constants';
import { userDetailGuard } from './core/guards/user-detail.guard';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.HOME,
    loadComponent: () => import('./features/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: ROUTE_PATHS.USER_DETAIL,
    canActivate: [userDetailGuard],
    loadComponent: () => import('./features/user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    redirectTo: ROUTE_PATHS.HOME
  }
];
