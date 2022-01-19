import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-victim-component',
  templateUrl: './add_victim.component.html',
  styleUrls: ['./add_victim.component.scss']
})
export class Add_victimComponent implements OnInit {
  @Input() colorType: string;

  constructor() {}

  ngOnInit(): void {}

  on_click(): void {
  }
}
