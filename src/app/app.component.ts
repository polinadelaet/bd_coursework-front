import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'laba4';
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    localStorage.clear();
  }
}

