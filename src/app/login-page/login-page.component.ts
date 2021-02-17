import {Component, OnInit, NgZone, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../user/user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  private user: User;
  login: string;
  password: string;
  answer: string;
  done: boolean = false;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private zone: NgZone,
              @Inject(Router) private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

  onSubmit(form: NgForm) {
    //  form.form.disable();
    this.user = new User();
    this.user.login = this.login;
    this.user.password = this.password;

    this.aSub = this.auth.login(this.user).subscribe(
      p => {
        this.router.navigate(['points']);
      },
      error => {
        this.done = true;
        if (error.status == '401' || error.status == '400') {
            this.answer = 'User does not exist.';
          }
        form.form.enable();
      },
      () => console.log('complete login-page')
    );
  }
}
