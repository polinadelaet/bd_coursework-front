import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SliderModule} from 'primeng/slider';
import {TokenInterceptor} from './classes/token.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersLayoutComponent } from './layouts/users-layout/users-layout.component';
import { ScientistLayoutComponent } from './layouts/usersPages/scientist-layout/scientist-layout.component';
import { JudgeLayoutComponent } from './layouts/usersPages/judge-layout/judge-layout.component';
import { PolicemanLayoutComponent } from './layouts/usersPages/policeman-layout/policeman-layout.component';

const appRoutes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegisterPageComponent},
    ]},
  {path: 'users', component: UsersLayoutComponent, children: [
      {path: 'scientist', component: ScientistLayoutComponent},
      {path: 'judge', component: JudgeLayoutComponent},
      {path: 'policeman', component: PolicemanLayoutComponent}
    ]},
  {path: 'points', component: SiteLayoutComponent},
  // {path: 'users', component: UsersLayoutComponent},
  // {path: 'scientist', component: ScientistLayoutComponent},
  // {path: 'judge', component: JudgeLayoutComponent},
  // {path: 'policeman', component: PolicemanLayoutComponent},
  // {path: '**', redirectTo: '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    NotFoundComponent,
    UsersLayoutComponent,
    ScientistLayoutComponent,
    JudgeLayoutComponent,
    PolicemanLayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    ProgressSpinnerModule,
    SliderModule,
  ],
  exports: [RouterModule],
  providers: [AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
