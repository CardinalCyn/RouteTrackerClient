import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,} from '@angular/common/http';

import { GoogleMapsModule } from '@angular/google-maps';

import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'

import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginRegisterFormComponent } from './components/login-register-form/login-register-form.component';
import { CreateRouteComponent } from './components/create-route/create-route.component';
import { MapComponent } from './components/map/map.component';
import { SecondsToTimePipe } from './pipes/time';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const config: SocketIoConfig={url:"https://127.0.0.1:5000",options:{}};
const appRoutes:Routes=[
  {
    path:"",component:HomeComponent
  },
  {
    path:"login",component:LoginComponent
  },
  {
    path:"register",component:RegisterComponent
  },
  {
    path:"main",component:MainComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    LoginRegisterFormComponent,
    CreateRouteComponent,
    MapComponent,
    SecondsToTimePipe,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing:false}),
    GoogleMapsModule,
    SocketIoModule.forRoot(config),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
