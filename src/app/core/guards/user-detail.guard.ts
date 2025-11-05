import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { ROUTE_PARAMS, ROUTE_PATHS } from '../constants/route.constants';

export const userDetailGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const userId = route.paramMap.get(ROUTE_PARAMS.USER_ID);

  if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
    console.warn(`Invalid user ID: ${userId}. Redirecting to home.`);
    router.navigate([`/${ROUTE_PATHS.HOME}`]);
    return false;
  }

  return true;
};
