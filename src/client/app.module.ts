import { NgModule, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }  from './app.routing';
import { AuthenticationService, AlertService, UserService, PatientService } from './services';

import { AuthGuard } from './guards/index';

import {
    HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent, ProfessionalDashboardComponent,
    AddPatientComponent, AlertComponent
} from './components/';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent,
        ProfessionalDashboardComponent, AddPatientComponent, AlertComponent],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [ AuthenticationService, AlertService, UserService, AuthGuard, PatientService ]
})

export class AppModule{}
