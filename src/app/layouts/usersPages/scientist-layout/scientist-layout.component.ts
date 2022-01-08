import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-scientist-layout',
  templateUrl: './scientist-layout.component.html',
  styleUrls: ['./scientist-layout.component.scss']
})
export class ScientistLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private zone: NgZone,
              @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    if (Number(localStorage.getItem('auth-role')) != 1) this.router.navigate(['/login']);
  }

}
