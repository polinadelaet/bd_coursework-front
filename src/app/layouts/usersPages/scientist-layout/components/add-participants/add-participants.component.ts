import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import {Vision} from "../../scientist-elements/Vision";
import {Victiml} from "../../scientist-elements/Victiml";
import {Suspectl} from "../../scientist-elements/Suspectl";
import {Victim} from "../../scientist-elements/dto/Victim";
import {Suspect} from "../../scientist-elements/dto/Suspect";

@Component({
  selector: 'app-add-participants',
  templateUrl: './add-participants.component.html',
  styleUrls: ['./add-participants.component.scss']
})
export class AddParticipantsComponent implements OnInit {
  currentCaseId: number;
  victimList: Array<Victim>;
  suspectList: Array<Suspect>;

  numberOfVictims: number;
  //arrayNumberOfVictims: Array<number>;
  arrayVictimsId: Array<Victiml>;
  showTableWithVictims: boolean;

  numberOfSuspects: number;
  arraySuspectsId: Array<Suspectl>;
  showTableWithSuspects: boolean;
  numberOfVictimsIncorrect: boolean;
  answerCreateVictimsInputs: string;
  numberOfSuspectsIncorrect: boolean;
  answerCreateSuspectsInputs: string;
  victimsIncorrect: boolean;
  answerSuspects: string;
  answerVictims: string;
  suspectsIncorrect: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getCurrentCaseId();
  }

  getCurrentCaseId() {
    this.auth.getCurrentCaseId().subscribe(
      data => {
          this.currentCaseId = data;
        });
  }

  createVictimsInputs() {
    this.numberOfVictimsIncorrect = false;
    //this.arrayNumberOfVictims = new Array<number>(this.numberOfVictims);
    if (this.numberOfVictims < 1) {
      this.numberOfVictimsIncorrect = true;
      this.answerCreateVictimsInputs = "Число жертв должно быть больше нуля";
      return;
    }
    this.arrayVictimsId = new Array<Victiml>(this.numberOfVictims);
    for (let i: number = 0; i < this.numberOfVictims; i++) {
      this.arrayVictimsId[i] = new Victiml(i + 1, null);
    }
    this.showTableWithVictims = true;
  }

  createSuspectsInputs() {
    this.numberOfSuspectsIncorrect = false;
    if (this.numberOfSuspects < 1) {
      this.numberOfSuspectsIncorrect = true;
      this.answerCreateSuspectsInputs = "Число подозреваемых должно быть больше нуля";
      return;
    }
    //this.arrayNumberOfVictims = new Array<number>(this.numberOfVictims);
    this.arraySuspectsId = new Array<Suspectl>(this.numberOfSuspects);
    for (let i: number = 0; i < this.numberOfSuspects; i++) {
      this.arraySuspectsId[i] = new Suspectl(i + 1, null, false, "firearm");
    }
    this.showTableWithSuspects = true;
  }


  createSuspects() {

    if (!this.check()) {return;}
    this.victimList = new Array<Victim>(this.numberOfVictims);
    for (let i = 0; i < this.numberOfVictims; i++){
      this.victimList[i] = new Victim(this.arrayVictimsId[i].person_id);
    }

    this.suspectList = new Array<Suspect>(this.numberOfSuspects);
    for (let i = 0; i < this.numberOfSuspects; i++){
      this.suspectList[i] = new Suspect(this.arraySuspectsId[i].person_id,
                                        this.arraySuspectsId[i].mentally_disturbed,
                                        this.arraySuspectsId[i].murder_weapon);
    }

    this.auth.addVictims(this.victimList).subscribe(
      data => {
        console.log('good');
      }
    );

    this.auth.addSuspects(this.suspectList).subscribe(
      data => {
        console.log('great');
      }
    );
  }

  private check(): boolean {
    let res = true;
    this.victimsIncorrect = false;
    for (let i = 0; i < this.numberOfVictims; i++) {
      if ((this.arrayVictimsId[i].person_id < 1) || (this.arrayVictimsId[i].person_id === undefined)) {
        this.victimsIncorrect = true;
        this.answerVictims = "Выберите корректный person_id";
        res = false;
      }
    }
    this.suspectsIncorrect = false;
    for (let i = 0; i < this.numberOfSuspects; i++) {
      if ((this.arraySuspectsId[i].person_id < 1) || (this.arraySuspectsId[i].person_id === undefined)) {
        this.suspectsIncorrect = true;
        this.answerSuspects = "Выберите корректный person_id";
        res = false;
      }
    }
    return res;
  }


}
