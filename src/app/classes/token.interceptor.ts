import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let authReq;
      if (localStorage.getItem('auth-login') == null || localStorage.getItem('auth-login') == undefined) {
      authReq = req.clone({
        headers: req.headers.set('LO',
          encodeURIComponent(this.auth.getLogin())
        )
          .set('PA',
            encodeURIComponent(this.auth.getPassword())
          )
      });
      } else {
        authReq = req.clone({
          headers: req.headers.set('LO',
            encodeURIComponent(localStorage.getItem('auth-login'))
          )
            .set('PA',
              encodeURIComponent(localStorage.getItem('auth-pass'))
            )
        });
      }
     // }
      console.log(this.auth.getLogin());
      console.log(this.auth.getPassword());
      console.log('v tokene');
      return next.handle(authReq);
    }
}
