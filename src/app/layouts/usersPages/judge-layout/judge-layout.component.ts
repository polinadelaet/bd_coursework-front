import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-judge-layout',
  templateUrl: './judge-layout.component.html',
  styleUrls: ['./judge-layout.component.scss']
})
export class JudgeLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private zone: NgZone,
              @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    if (Number(localStorage.getItem('auth-role')) != 2) this.router.navigate(['/login']);
  }

}
