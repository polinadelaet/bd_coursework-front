import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import {Vision} from "../../scientist-elements/Vision";
import {Victiml} from "../../scientist-elements/Victiml";
import {Suspectl} from "../../scientist-elements/Suspectl";

@Component({
  selector: 'app-add-participants',
  templateUrl: './add-participants.component.html',
  styleUrls: ['./add-participants.component.scss']
})
export class AddParticipantsComponent implements OnInit {
  currentCaseId: number;

  numberOfVictims: number;
  //arrayNumberOfVictims: Array<number>;
  arrayVictimsId: Array<Victiml>;
  showTableWithVictims: boolean;

  numberOfSuspects: number;
  arraySuspectsId: Array<Suspectl>;
  showTableWithSuspects: boolean;

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
    //this.arrayNumberOfVictims = new Array<number>(this.numberOfVictims);
    this.arrayVictimsId = new Array<Victiml>(this.numberOfVictims);
    for (let i: number = 0; i < this.numberOfVictims; i++) {
      this.arrayVictimsId[i] = new Victiml(i + 1, null);
    }
    this.showTableWithVictims = true;
  }

  createSuspectsInputs() {
    //this.arrayNumberOfVictims = new Array<number>(this.numberOfVictims);
    this.arraySuspectsId = new Array<Suspectl>(this.numberOfSuspects);
    for (let i: number = 0; i < this.numberOfSuspects; i++) {
      this.arraySuspectsId[i] = new Suspectl(i + 1, null, false, null);
    }
    this.showTableWithSuspects = true;
  }


}
