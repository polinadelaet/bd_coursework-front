import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NgForm, FormBuilder, Validators} from '@angular/forms';
import {Seer} from "../../scientist-elements/Seer";
import {AuthService} from "../../../../../services/auth.service";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-add-visions',
  templateUrl: './add-visions.component.html',
  styleUrls: ['./add-visions.component.scss']
})
export class AddVisionsComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  isCompleted = false;
  activatedSeerList: number[];
  datesOfVisionList: string[];
  descriptionList: string[];
  date_of_vision: string;
  description: string;

  seersForm: FormGroup;


  constructor(private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.auth.getIdOfActivatedSeers().subscribe(
      data => {
        this.activatedSeerList = data;
      });
  }

  onSubmit(form: NgForm) {}

  completeStep(){
    this.stepper.selected.completed = true;
    this.stepper.next();
    this.datesOfVisionList.push(this.date_of_vision);
    this.descriptionList.push(this.description);
    this.isCompleted = true;
  }
}
