import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Casel} from "../Casel";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-policeman-notification',
  templateUrl: './policeman-notification.component.html',
  styleUrls: ['./policeman-notification.component.scss']
})
export class PolicemanNotificationComponent implements OnInit {

  caseList: Array<Casel>;


  constructor(private auth: AuthService,@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.getOpenCases();
  }

  on_click(): void {
  }

  getOpenCases() {
    this.auth.getCases(this.data).subscribe(
      dat => {
        this.caseList = dat;
      }
    );
  }
}
