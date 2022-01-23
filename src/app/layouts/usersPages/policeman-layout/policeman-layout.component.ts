import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GetPersonsComponent} from "../scientist-layout/components/get-persons/get-persons.component";
import {PolicemanNotificationComponent} from "./policeman-notification/policeman-notification.component";
import {PolicemanUpdateCaseComponent} from "./policeman-update-case/policeman-update-case.component";

@Component({
  selector: 'app-policeman-layout',
  templateUrl: './policeman-layout.component.html',
  styleUrls: ['./policeman-layout.component.scss']
})
export class PolicemanLayoutComponent implements OnInit {

  policemanId: number;

  constructor(private auth: AuthService,
              private matDialog: MatDialog,
              private zone: NgZone,
              @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    if (Number(localStorage.getItem('auth-role')) != 3) this.router.navigate(['/login']);
    let log = localStorage.getItem('auth-login');
    this.auth.getP_id(log).subscribe(
      data => {
        this.policemanId = data;
      }
    );
  }

  opened_click(): void {
    this.matDialog.open(PolicemanNotificationComponent, {
        data: this.policemanId
    });
  }
  update_click(): void {
    this.matDialog.open(PolicemanUpdateCaseComponent,{
      data: this.policemanId
    });
  }
}
