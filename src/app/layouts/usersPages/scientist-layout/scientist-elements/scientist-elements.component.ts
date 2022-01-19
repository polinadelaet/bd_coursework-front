import { Component, OnInit } from '@angular/core';
import {Seer} from "./Seer";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-scientist-elements',
  templateUrl: './scientist-elements.component.html',
  styleUrls: ['./scientist-elements.component.scss']
})
export class ScientistElementsComponent implements OnInit {

  seerList: Seer[];

  activatedSeerList: number[];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getSeers().subscribe(
      data => {
        this.seerList = data;
      });

    // this.auth.getIdOfActivatedSeers().subscribe(
    //   data => {
    //     this.activatedSeerList = data;
    //   });
  }



}
