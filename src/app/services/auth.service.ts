import {Injectable} from '@angular/core';
import {User} from '../user/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Point} from '../point/point';
import {TablePoint} from '../tablePoint/tablePoint';
import {Seer} from "../layouts/usersPages/scientist-layout/scientist-elements/Seer";
import {Vision} from "../layouts/usersPages/scientist-layout/scientist-elements/Vision";
import {Person} from "../layouts/usersPages/scientist-layout/scientist-elements/Person";
import {Victim} from "../layouts/usersPages/scientist-layout/scientist-elements/dto/Victim";
import {Suspect} from "../layouts/usersPages/scientist-layout/scientist-elements/dto/Suspect";
import {SuspectVictim} from "../layouts/usersPages/scientist-layout/scientist-elements/dto/SuspectVictim";
import {Casel} from "../layouts/usersPages/policeman-layout/Casel";
import {NewCase} from "../layouts/usersPages/policeman-layout/policeman-update-case/NewCase";
import {OffenderDTO} from "../layouts/usersPages/judge-layout/OffenderDTO";

@Injectable()
export class AuthService {

  public token = null;
  private loginH = null;
  private passwordH = null;
  private role = null;
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    this.token = null;
  }

  login(user: User): Observable<{token: string}> {

    this.loginH = user.login;
    this.passwordH = user.password;

    return this.http.post<{token: string}>(this.url + '/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-login', user.login);
            localStorage.setItem('auth-pass', user.password);
            console.log(token);
            this.role = Number(token);
            localStorage.setItem('auth-role', this.role);
            this.setLogin(user.login);
          },
          (err) => {
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

  getP_id(log: string) {
    return this.http.post<number>(this.url + '/users/policeman/getPID', log);
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
    return this.http.post<{result: string}>(this.url + '/points', point);
  }

  getSeers() {
    return this.http.get<Seer[]>(this.url + '/users/scientist');
  }

  getIdOfActivatedSeers() {
    return this.http.get<number[]>(this.url + '/users/scientist/get_id_of_activated_seers');
  }

  addVisions(visions: Vision[]) {
    return this.http.post<number[]>(this.url + '/users/scientist/addVisions', visions);
  }

  getCurrentCaseId() {
    return this.http.get<number>(this.url + '/users/scientist/getCurrentCaseId');
  }

  getPersons() {
    return this.http.get<Person[]>(this.url + '/users/scientist/getPersons');
  }

  getLastVisions() {
    return this.http.get<number[]>(this.url + '/users/scientist/getLastVisions');
  }

  getNumOfLastVisions() {
    return this.http.get<number>(this.url + '/users/scientist/getNumOfLastVisions');
  }

  // tslint:disable-next-line:typedef
  addVictims(victims: Victim[]) {
    return this.http.post<{result: string}>(this.url + '/users/scientist/addVictims', victims);
  }
  // tslint:disable-next-line:typedef
  addSuspects(suspects: Suspect[]) {
    return this.http.post<{result: string}>(this.url + '/users/scientist/addSuspects', suspects);
  }


  addVictim(victim: Victim) {
    return this.http.post<number>(this.url + '/users/scientist/addVictim', victim);
  }

  addSuspect(suspect: Suspect) {
    return this.http.post<number>(this.url + '/users/scientist/addSuspect', suspect);
  }

  addSuspectVictim(suspectVictimList: SuspectVictim[]) {
    return this.http.post<string>(this.url + '/users/scientist/addSuspectVictim', suspectVictimList);
  }

  getCases(policemanId: number) {
    return this.http.post<Casel[]>(this.url + '/users/policeman/getCasesByPolicemanId', policemanId);
  }

  getCaseForUpdate(pid: number) {
    return this.http.post<Casel>(this.url + '/users/policeman/getCaseForUpdate', pid);
  }

  updateCase(courtCase: NewCase) {
    return this.http.post<Casel>(this.url + '/users/policeman/updateCase', courtCase);
  }

  getOffender() {
    return this.http.get<OffenderDTO>(this.url + '/users/judge/getOffender');
  }

  updateOffender(offender: OffenderDTO) {
    return this.http.post(this.url + '/users/judge/updateOffender', offender);
  }
}

