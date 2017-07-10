import { NgModule, OnInit } from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }  from './app.routing';
import {
            AuthenticationService, AlertService, UserService, PatientService, ProfessionalService, PatientResolver,
            ProfessionalResolver, AppointmentService, AppointmentResolver, AddAppointmentResolver,
            SkillResolver, SkillService
        } from './services';
import { CalendarModule } from 'angular-calendar';
import { AuthGuard } from './guards/index';

import {
    HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent, ProfessionalDashboardComponent,
    AddPatientComponent, AlertComponent, EditPatientComponent, ProfileComponent, CalendarComponent, LinksComponent,
    BackComponent, SkillsComponent, ClientsComponent, ReportsComponent, AddAppointmentComponent,
    AppointmentListComponent, SkillListComponent, AddSkillComponent

} from './components/';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent,
        ProfessionalDashboardComponent, AddPatientComponent, EditPatientComponent, AlertComponent, ProfileComponent,
        CalendarComponent, LinksComponent, BackComponent, SkillsComponent, ClientsComponent, ReportsComponent,
        AddAppointmentComponent, AppointmentListComponent, SkillListComponent, AddSkillComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CalendarModule.forRoot()
    ],
    providers: [ AuthenticationService, AlertService, UserService, AuthGuard, PatientService,
        ProfessionalService, PatientResolver, ProfessionalResolver, AppointmentService, AppointmentResolver,
        AddAppointmentResolver, DatePipe, SkillService, SkillResolver
    ]
})

export class AppModule{}
