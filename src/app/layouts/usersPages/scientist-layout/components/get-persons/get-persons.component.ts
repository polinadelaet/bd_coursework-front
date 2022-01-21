import { Component, OnInit } from '@angular/core';
import {Person} from "../../scientist-elements/Person";
import {AuthService} from "../../../../../services/auth.service";

@Component({
  selector: 'app-get-persons',
  templateUrl: './get-persons.component.html',
  styleUrls: ['./get-persons.component.scss']
})
export class GetPersonsComponent implements OnInit {

  personList: Array<Person>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getPersons().subscribe(
      data => {
        this.personList = data;
      });
  }

}
