import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OffenderDTO} from "../OffenderDTO";
import {newOffender} from "../newOffender";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-judge-notification',
  templateUrl: './judge-notification.component.html',
  styleUrls: ['./judge-notification.component.scss']
})
export class JudgeNotificationComponent implements OnInit {
  answerThereNoOffenderForUpdate: boolean;
  addUpdateOffender: boolean = false;
  answer: string;
  offender: OffenderDTO;
  newOffender: newOffender;
  incorrectUpdate: boolean;
  answerIncorrectUpdate: string;
  answerAfterUpdateOffender: string;


  constructor(private auth: AuthService, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.newOffender = new newOffender("deliberate");
    this.auth.getOffender().subscribe(
      dat => {
        if (dat == null) {
          this.answerThereNoOffenderForUpdate = true;
          this.answer = "There are no offender for update.";
        }
        this.offender = dat;
      },
      error => {
        this.answerThereNoOffenderForUpdate = true;
        this.answer = "There are no offender for update.";
      }
    );
  }

  on_click(): void {
  }

  update_offender() {
    this.offender.type_of_crime = this.newOffender.type_of_crime;
    this.auth.updateOffender(this.offender).subscribe(
      dat => {
        console.log("good");
      },
      err => {}
    );
    this.answerAfterUpdateOffender = "Offender updated successfully!";
    this.addUpdateOffender = true;
  }
}
