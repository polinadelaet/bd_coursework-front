import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() colorType: string;

  constructor() {}

  ngOnInit(): void {}

  on_click(): void {
  }
}
