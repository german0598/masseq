import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router ){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    const token = localStorage.getItem('token_user');

    if (token) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
