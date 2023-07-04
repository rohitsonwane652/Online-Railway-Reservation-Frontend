import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const loginService:LoginService = inject(LoginService);

    const router:Router = inject(Router);

    if(loginService.isLoggedIn()){
      return true;
    }
    loginService.openSignInDialog();
    return false;
};
