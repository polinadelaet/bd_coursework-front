import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import {SuspectVictiml} from "../add-participants/SuspectVictiml";
import {SuspectVictim} from "../../scientist-elements/dto/SuspectVictim";
import {VisionVictiml} from "./VisionVictiml";
import {Victim} from "../../scientist-elements/dto/Victim";
import {VisionVictimCorrect} from "./VisionVictimCorrect";
import {VisionSuspectCorrect} from "./VisionSuspectCorrect";
import {Suspect} from "../../scientist-elements/dto/Suspect";
import {VisionSuspectl} from "./VisionSuspectl";


@Component({
  selector: 'app-suspect-victim',
  templateUrl: './suspect-victim.component.html',
  styleUrls: ['./suspect-victim.component.scss']
})
export class SuspectVictimComponent implements OnInit {
  seersIdList: Array<number>;
  visionsIdList: Array<number>;
  victimsId: Array<number>;
  suspectId: Array<number>;
  numVictims: boolean;

  yesAddVictim: boolean;
  yesAddSuspect: boolean;
  visionVictimList: Array<VisionVictiml>;
  correctArrayOfVisionVictims: Array<VisionVictimCorrect>;
  correctArrayOfVisionSuspects: Array<VisionSuspectCorrect>;
  visionSuspectList: Array<VisionSuspectl>;
  suspectVictimList: Array<SuspectVictim>;
  addingVictimsList: Array<Victim>;
  addingSuspectsList: Array<Suspect>;
  personVictimIdList: Array<number>;
  personSuspectIdList: Array<number>;
  mapSuspects: Map<number, number>;
  mapVictims: Map<number, number>;
  isCreateSuspectVictim: boolean;


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
    this.personVictimIdList = new Array<number>();
    this.personSuspectIdList = new Array<number>();
    this.addingVictimsList = new Array<Victim>();
    this.addingSuspectsList = new Array<Suspect>();
    this.suspectVictimList = new Array<SuspectVictim>();
    this.mapSuspects = new Map;
    this.mapVictims = new Map;
  }

  init1() {
    this.yesAddVictim = false;
    this.yesAddSuspect = false;

    this.visionVictimList = new Array<VisionVictiml>(this.visionsIdList.length);
    for (let i = 0; i < this.visionVictimList.length; i++) {
      this.visionVictimList[i] = new VisionVictiml(this.visionsIdList[i]);
    }
  }

  init2() {
    this.yesAddVictim = false;
    this.yesAddSuspect = false;

    this.visionSuspectList = new Array<VisionSuspectl>(this.visionsIdList.length);
    for (let i = 0; i < this.visionSuspectList.length; i++) {
      this.visionSuspectList[i] = new VisionSuspectl(this.visionsIdList[i], null, false, 'firearm');
    }
  }

  addVictimInput() {
    this.init1();
    this.yesAddVictim = true;

    this.correctArrayOfVisionVictims = new Array(this.visionsIdList.length);
    for (let i = 0; i < this.visionsIdList.length; i++) {
      this.correctArrayOfVisionVictims[i] = new VisionVictimCorrect(this.visionsIdList[i]);
    }

  }

  addSuspectInput() {
    this.init2();
    this.yesAddSuspect = true;

    this.correctArrayOfVisionSuspects = new Array(this.visionsIdList.length);
    for (let i = 0; i < this.visionsIdList.length; i++) {
      this.correctArrayOfVisionSuspects[i] = new VisionSuspectCorrect(this.visionsIdList[i]);
    }
  }

  createVictim(index: number, person_id: number) {
    console.log(index);
    console.log(person_id);
    let victim;
    if (this.personVictimIdList.includes(person_id)) {
      let num = this.correctArrayOfVisionVictims[index].victim_id.push(this.mapVictims.get(person_id));
      return;
    } else {
      victim = new Victim(person_id);
      this.addingVictimsList.push(victim);
      this.personVictimIdList.push(person_id);
    }

    this.auth.addVictim(victim).subscribe(
      data => {
        console.log(this.correctArrayOfVisionVictims[index].vision_id);
        let num = this.correctArrayOfVisionVictims[index].victim_id.push(data);
        this.mapVictims.set(person_id, data);
        console.log(num);

      }
    );

    console.log(this.correctArrayOfVisionVictims[index].victim_id[0]);
  }

  createSuspect(index: number, person_id: number,
                mentally_disturbed: boolean, weapon: string) {
    console.log(index);
    console.log(person_id);

    let suspect;
    if (this.personSuspectIdList.includes(person_id)) {
      let num = this.correctArrayOfVisionSuspects[index].suspect_id.push(this.mapSuspects.get(person_id));
      console.log("num = " + num);
      return;
    } else {
      suspect = new Suspect(person_id, mentally_disturbed, weapon);
      this.addingSuspectsList.push(suspect);
      this.personSuspectIdList.push(person_id);
    }

    this.auth.addSuspect(suspect).subscribe(
      data => {
        console.log(this.correctArrayOfVisionSuspects[index].vision_id);
        let num = this.correctArrayOfVisionSuspects[index].suspect_id.push(data);
        this.mapSuspects.set(person_id, data);
        console.log("num = " + num);

      }
    );

  }


  createSuspectVictim() {
    this.isCreateSuspectVictim = true;
    let m = 0;
    console.log("this.correctArrayOfVisionSuspects[i].suspect_id.length = " + this.correctArrayOfVisionSuspects[0].suspect_id.length);
    console.log("this.correctArrayOfVisionVictims[i].victim_id.length = " + this.correctArrayOfVisionVictims[0].victim_id.length);
    console.log("this.visionsIdList.length = " + this.visionsIdList.length);
    for (let i = 0; i < this.visionsIdList.length; i++) { // 5
      for (let j = 0; j < this.correctArrayOfVisionVictims[i].victim_id.length; j++) {
        for (let k = 0; k < this.correctArrayOfVisionSuspects[i].suspect_id.length; k++) {
          console.log("victim(" + this.visionsIdList[i]+", " + this.correctArrayOfVisionVictims[i].victim_id[j] + ", "
                      +this.correctArrayOfVisionSuspects[i].suspect_id[k]+ ")");
          let suspectVictim = new SuspectVictim(this.visionsIdList[i],
                                                this.correctArrayOfVisionVictims[i].victim_id[j],
                                                this.correctArrayOfVisionSuspects[i].suspect_id[k]);
          m++;
          console.log("m = " + m);
          this.suspectVictimList.push(suspectVictim);
        }
      }
    }
    this.sendSuspectVictim();
  }

  sendSuspectVictim() {
    this.auth.addSuspectVictim(this.suspectVictimList).subscribe(
      data => {
        console.log(data);
      },
      err => {

      }
    );
  }
}
