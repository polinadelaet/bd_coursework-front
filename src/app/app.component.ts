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
     // const potentialToken = localStorage.getItem('auth-token');
     //
     // if (potentialToken !== null) {
     //   this.auth.setToken(potentialToken);
     // }
  }

  ngOnDestroy() {
    localStorage.clear();
  }
}

