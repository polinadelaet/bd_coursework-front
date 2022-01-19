import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-suspect-component',
  templateUrl: './add_suspect.component.html',
  styleUrls: ['./add_suspect.component.scss']
})
export class Add_suspectComponent implements OnInit {
  @Input() colorType: string;

  constructor() {}

  ngOnInit(): void {}

  on_click(): void {
  }
}
