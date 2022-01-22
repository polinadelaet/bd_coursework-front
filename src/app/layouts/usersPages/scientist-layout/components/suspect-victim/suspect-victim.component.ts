import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import {SuspectVictiml} from "../add-participants/SuspectVictiml";
import {SuspectVictim} from "../../scientist-elements/dto/SuspectVictim";


@Component({
  selector: 'app-suspect-victim',
  templateUrl: './suspect-victim.component.html',
  styleUrls: ['./suspect-victim.component.scss']
})
export class SuspectVictimComponent implements OnInit {
  seersIdList: Array<number>;
  visionsIdList: Array<number>;
  suspectVictimList: Array <SuspectVictim>;
  victimsId: Array<number>;
  numberOfVictims: Array<number>;
  numberOfSuspects: number;
  suspectId: Array<number>;
  arrOfSVL: Array<SuspectVictiml>;
  numberOfVisions: number;
  yes : boolean = false;
  numVictims: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getLastVisions().subscribe(
      data => {
        this.visionsIdList = data;
      }
    );
    this.auth.getIdOfActivatedSeers().subscribe(
      id => {
        this.seersIdList = id;
      }
    );
  }

  init() {

    console.log(this.visionsIdList.length);
    this.arrOfSVL = new Array<SuspectVictiml>(this.visionsIdList.length);
    for (let i = 0; i < this.arrOfSVL.length; i++) {
      this.arrOfSVL[i] = new SuspectVictiml(this.seersIdList[i], null, null);
    }

    // this.seersIdList = new Array<number>(this.visionsIdList.length);
    // for (let i = 0; i < this.seersIdList.length; i++) {
    //   this.seersIdList[i] = i + 1;
    // }
    this.yes = true;
}

  createVictims(n: number) {
    this.numVictims = true;
    this.numberOfVictims = new Array<number>(n);
  }
}
