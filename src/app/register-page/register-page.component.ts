import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {User} from '../user/user';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  private user: User;
  login: string;
  id: number;
  password: string;
  password2: string;
  roleId: number = 1;
  aSub: Subscription;
  answer: string;
  done: boolean = false;

  constructor(private auth: AuthService,
              @Inject(Router) private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    console.log(this.roleId);
    this.user = new User();
    this.user.login = this.login;
    this.user.password = this.password;
    this.user.roleId = this.roleId;
    this.user.p_id = this.id;
    console.log(this.user.roleId);
    form.form.disable();
    this.aSub = this.auth.registration(this.user).subscribe(
      () => {
        this.router.navigate(['login'], {
          queryParams: {
            registered: true
          }
        });
      },
      error => {
        this.done = true;
        if (error.status == '401' || error.status == '400') {
          this.answer = 'The user already exists.';
        }
        form.form.enable();
      }
    );
  }
}
