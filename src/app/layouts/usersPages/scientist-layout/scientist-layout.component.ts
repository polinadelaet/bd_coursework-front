import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ScientistElementsComponent} from './scientist-elements/scientist-elements.component';
import {AddVisionsComponent} from './components/add-visions/add-visions.component';
import {Seer} from './scientist-elements/Seer';
import {Vision} from './scientist-elements/Vision';
import {timestamp} from 'rxjs/operators';
import {Timestamp} from 'rxjs/internal-compatibility';
import * as moment from 'moment';
import {AddParticipantsComponent} from "./components/add-participants/add-participants.component";


@Component({
  selector: 'app-scientist-layout',
  templateUrl: './scientist-layout.component.html',
  styleUrls: ['./scientist-layout.component.scss']
})
export class ScientistLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private zone: NgZone,
              private matDialog: MatDialog,
              @Inject(Router) private router: Router) { }

  isCompleted = false;
  activatedSeerList: number[];
  description: string;
  index = 0;
  visionList: Array<Vision>;
  len: number;
  done: boolean;
  answer: string;
  //
  // openDialog() {
  //   this.matDialog.open(ScientistElementsComponent);
  // }
  date_of_vision: any;
  amount: any;
  public todayDate = new Date();
  visionsExist: boolean;

  ngOnInit(): void {
    if (Number(localStorage.getItem('auth-role')) != 1) { this.router.navigate(['/login']); }
    this.auth.getIdOfActivatedSeers().subscribe(
      data => {
        this.activatedSeerList = data;
        this.visionList = new Array<Vision>(this.activatedSeerList.length);
        for (let i = 0; i < this.visionList.length; i++) {
          this.visionList[i] = new Vision(this.activatedSeerList[i], null);
        }
      });
  }

  seers_click(): void {
    this.matDialog.open(ScientistElementsComponent);
  }
  visions_click(): void {
    this.matDialog.open(AddVisionsComponent);
  }

  participants_click() {
    this.matDialog.open(AddParticipantsComponent);
  }


  addVisions() {
    this.visionsExist = false;
    this.checkDate(this.visionList[0].date_of_vision);
    this.done = false;
    for (let i = 0; i < this.visionList.length; i++) {
      if (this.visionList[i].date_of_vision == null || this.visionList[i].date_of_vision == undefined) {
        this.done = true;
        this.answer = 'date of vision is required';
        return;
      } else if (!this.checkDate(this.visionList[i].date_of_vision)) {
        this.done = true;
        this.answer = 'your date of vision has incorrect format';
        return;
      }
    }
    for (let i = 0; i < this.visionList.length; i++) {
      if (this.visionList[i].description == null || this.visionList[i].description == undefined ||
            this.visionList[i].description.length < 1) {
        this.done = true;
        this.answer = 'fill in the description';
        return;
      }
    }

    this.auth.addVisions(this.visionList).subscribe(
      data => {
            console.log('good');
        }
      );
    this.visionsExist = true;

  }

  checkDate(s: string) {

    return moment(s, 'YYYY-MM-DD', true).isValid();

  }



}

