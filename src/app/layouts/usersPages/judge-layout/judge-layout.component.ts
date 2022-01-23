import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {JudgeNotificationComponent} from "./judge-notification/judge-notification.component";

@Component({
  selector: 'app-judge-layout',
  templateUrl: './judge-layout.component.html',
  styleUrls: ['./judge-layout.component.scss']
})
export class JudgeLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private zone: NgZone,
              private matDialog: MatDialog,
              @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    if (Number(localStorage.getItem('auth-role')) != 2) this.router.navigate(['/login']);
  }

  courts_click(): void {
    this.matDialog.open(JudgeNotificationComponent);
  }

}
