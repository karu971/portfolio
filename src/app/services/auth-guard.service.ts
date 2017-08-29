import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

canActivate(){
  console.log('test');
  if (this._authService.userIsLoggedIn()) return true;

  this._router.navigate(['/login']);
  return false;
}

}
