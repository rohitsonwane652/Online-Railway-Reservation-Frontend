import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const loginService:LoginService = inject(LoginService);

  const router:Router = inject(Router);

  if(loginService.isRoleAdmin() && loginService.isLoggedIn()){
    return true;
  }else{
    window.alert("You are not authorized to access this url")
    return false;
  }
};
