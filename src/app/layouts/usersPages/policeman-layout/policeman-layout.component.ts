import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-policeman-layout',
  templateUrl: './policeman-layout.component.html',
  styleUrls: ['./policeman-layout.component.scss']
})
export class PolicemanLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private zone: NgZone,
              @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    if (Number(localStorage.getItem('auth-role')) != 3) this.router.navigate(['/login']);
  }

}
