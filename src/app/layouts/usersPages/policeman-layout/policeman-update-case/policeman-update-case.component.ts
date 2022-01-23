import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Casel} from "../Casel";
import {NewCase} from "./NewCase";
import * as moment from "moment";

@Component({
  selector: 'app-policeman-update-case',
  templateUrl: './policeman-update-case.component.html',
  styleUrls: ['./policeman-update-case.component.scss']
})
export class PolicemanUpdateCaseComponent implements OnInit {

  case: Casel;
  newcase: NewCase;
  inputJudge_id: number;
  answerThereNoCaseForUpdate: boolean;
  answer: string;
  addUpdateCase: boolean = false;
  answerAfterUpdateCase: string;
  incorrectUpdate: boolean;
  answerIncorrectUpdateJudge: String;
  answerIncorrectUpdateDateOfCrime: String;
  answerIncorrectUpdateCoordinates: String;

  constructor(private auth: AuthService, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.newcase = new NewCase();
    this.auth.getCaseForUpdate(this.data).subscribe(
      dat => {
        if (dat == null) {
          this.answerThereNoCaseForUpdate = true;
          this.answer = "There are no case for update.";
        }
        this.case = dat;
      }
    );
  }


  update_case() {
    this.incorrectUpdate = false;
    this.answerIncorrectUpdateJudge = '';
    this.answerIncorrectUpdateDateOfCrime = '';
    this.answerIncorrectUpdateCoordinates = '';
    let flag: boolean = false;
    if (this.newcase.judge_id === null || this.newcase.judge_id === undefined || this.newcase.judge_id < 1) {
      this.incorrectUpdate = true;
      this.answerIncorrectUpdateJudge = "Fill in the judge_id.";
      flag = true;
    }
    if (this.newcase.date_of_crime === null || this.newcase.date_of_crime === undefined || !this.checkDate(this.newcase.date_of_crime)) {
      this.incorrectUpdate = true;
      this.answerIncorrectUpdateDateOfCrime = "Fill in the date of crime.";
      flag = true;
    }
    if (this.newcase.coordinates === null || this.newcase.coordinates === undefined) {
      this.incorrectUpdate = true;
      this.answerIncorrectUpdateCoordinates = "Fill in the coordinates.";
      flag = true;
    }
    if (flag) {return;}
    this.newcase.id = this.case.id;
    this.newcase.policeman_id = this.case.policeman_id;
    this.newcase.status = this.case.status;
    this.newcase.opening_date = this.case.opening_date;
    this.auth.updateCase(this.newcase).subscribe(
      data => {
        console.log("good");
      },
      error => {}

    );
    this.addUpdateCase = true;
    this.answerAfterUpdateCase = "Дело обновлено!";

  }

  checkDate(s: string) {

    return moment(s, 'YYYY-MM-DD', true).isValid();

  }
}
