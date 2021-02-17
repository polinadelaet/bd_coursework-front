import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //if (this.auth.isAuthenticated()) {
    if (localStorage.getItem('auth-login') !== null && localStorage.getItem('auth-login') !== undefined) {
    // console.log(this.auth.token);
      console.log('auth true');
      console.log(localStorage.getItem('auth-login'));
      console.log('auth true');
      //this.router.navigate(['points']);
      return of(true);
    } else {
      console.log('auth false');
      this.router.navigate(['login'], {
        queryParams: {
          accessDenied: true
        }
      });
      return of(false);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
