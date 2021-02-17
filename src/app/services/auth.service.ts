import {Injectable} from '@angular/core';
import {User} from '../user/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Point} from '../point/point';
import {TablePoint} from '../tablePoint/tablePoint';

@Injectable()
export class AuthService {

  public token = null;
  private loginH = null;
  private passwordH = null;
  private url = 'http://localhost:10821';

  constructor(private http: HttpClient) {
    this.token = null;
  }

  login(user: User): Observable<{token: string}> {

    this.loginH = user.login;
    this.passwordH = user.password;
    console.log('in auth l= ' + user.login);
    console.log('in auth p= ' + user.password);

    return this.http.post<{token: string}>(this.url + '/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            //  localStorage.setItem('auth-token', user.login);
            console.log('skipidi');
            localStorage.setItem('auth-login', user.login);
            localStorage.setItem('auth-pass', user.password);
            console.log(localStorage.getItem('auth-login'));
            this.setLogin(user.login);
          },
          (err) => {
            console.log('ошибка');
            console.log(err);
          }
        )
      );
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/auth/registration', user);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.loginH;
  }

  logout() {
    this.setLogin(null);
    localStorage.clear();
  }

  setLogin(login: string) {
      this.loginH = login;
  }

  setPassword(password: string) {
    this.passwordH = password;
  }

  getLogin() {
    return this.loginH;
  }

  getPassword() {
    return this.passwordH;
  }

  getPoints(){
    return this.http.get<TablePoint[]>(this.url + '/points');
  }

  addPoint(point: Point): Observable<{result: string}> {

    return this.http.post<{result: string}>(this.url + '/points/add-point', point);
  }
}