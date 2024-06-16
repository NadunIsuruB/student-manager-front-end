import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLoggedIn()) {
    return true
  } else {
    router.navigate(['/login']);
    return false
  }
}