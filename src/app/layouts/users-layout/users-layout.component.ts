import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.scss']
})
export class UsersLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private zone: NgZone,
              @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('auth-login') !== null && localStorage.getItem('auth-login') !== undefined &&
        localStorage.getItem('auth-role') !== null && localStorage.getItem('auth-role') !== undefined) {
      if (Number(localStorage.getItem('auth-role')) === 1) this.router.navigate(['users/scientist']);
      if (Number(localStorage.getItem('auth-role')) === 2) this.router.navigate(['users/judge']);
      if (Number(localStorage.getItem('auth-role')) === 3) this.router.navigate(['users/policeman']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
