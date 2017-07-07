import { NgModule, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }  from './app.routing';
import { AuthenticationService, AlertService, UserService, PatientService, ProfessionalService, PatientResolver,
    ProfessionalResolver, AppointmentService, AppointmentResolver } from './services';
import { CalendarModule } from 'angular-calendar';
import { AuthGuard } from './guards/index';

import {
    HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent, ProfessionalDashboardComponent,
    AddPatientComponent, AlertComponent, EditPatientComponent, ProfileComponent, CalendarComponent, LinksComponent,
    BackComponent, SkillsComponent, ClientsComponent, ReportsComponent, AddAppointmentComponent, AppointmentListComponent

} from './components/';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent,
        ProfessionalDashboardComponent, AddPatientComponent, EditPatientComponent, AlertComponent, ProfileComponent,
        CalendarComponent, LinksComponent, BackComponent, SkillsComponent, ClientsComponent, ReportsComponent,
        AddAppointmentComponent, AppointmentListComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CalendarModule.forRoot()
    ],
    providers: [ AuthenticationService, AlertService, UserService, AuthGuard, PatientService, ProfessionalService, PatientResolver, ProfessionalResolver, AppointmentService, AppointmentResolver ]
})

export class AppModule{}
