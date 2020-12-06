import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor( private router: Router ){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    const token = localStorage.getItem('token_user');
    if (!token) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }

}
