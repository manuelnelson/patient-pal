import { NgModule, OnInit } from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }  from './app.routing';
import {
            AuthenticationService, AlertService, UserService, PatientService, ProfessionalService, PatientResolver,
            ProfessionalResolver, AppointmentService, AppointmentResolver, AddAppointmentResolver,
            SkillResolver, SkillService, DttTypeService, TargetTypeService, DttTypeResolver, TargetTypeResolver,
            CurriculumService, CurriculumResolver, ClientCurriculumService, ClientCurriculumResolver
        } from './services';
import { CalendarModule } from 'angular-calendar';
import { AuthGuard } from './guards/index';

import {
    HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent, ProfessionalDashboardComponent,
    AddPatientComponent, AlertComponent, EditPatientComponent, ProfileComponent, CalendarComponent, LinksComponent,
    BackComponent, SkillsComponent, ClientsComponent, ReportsComponent, AddAppointmentComponent,
    AppointmentListComponent, SkillListComponent, AddSkillComponent, CurriculumListComponent, CreateCurriculumComponent,
    CurriculumsComponent, StartAppointmentComponent, AppointmentDetailComponent, AssignCurriculumComponent
} from './components/';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent,
        ProfessionalDashboardComponent, AddPatientComponent, EditPatientComponent, AlertComponent, ProfileComponent,
        CalendarComponent, LinksComponent, BackComponent, SkillsComponent, ClientsComponent, ReportsComponent,
        AddAppointmentComponent, AppointmentListComponent, SkillListComponent, AddSkillComponent, CurriculumListComponent,
        CreateCurriculumComponent, CurriculumsComponent, StartAppointmentComponent, AppointmentDetailComponent, StartAppointmentComponent,
        AssignCurriculumComponent
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
        AddAppointmentResolver, DatePipe, SkillService, SkillResolver, TargetTypeService, DttTypeService,
        DttTypeResolver, TargetTypeResolver, CurriculumService, CurriculumResolver, ClientCurriculumService ,ClientCurriculumResolver
    ]
})

export class AppModule{}
