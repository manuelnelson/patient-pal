import { NgModule, OnInit, ErrorHandler } from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import {RouteReuseStrategy} from "@angular/router";
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }  from './app.routing';
//import { MdSliderModule } from '@angular/material';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import {
            GlobalErrorHandler, AuthenticationService, AlertService, UserService, ClientService, ProfessionalService, ClientResolver,
            ProfessionalResolver, AppointmentService, AppointmentListResolver, AddAppointmentResolver,
            SkillResolver, SkillService, DttTypeService, TargetTypeService, DttTypeResolver, TargetTypeResolver,
            CurriculumService, CurriculumResolver, CurriculumListResolver, ClientCurriculumService, ClientCurriculumResolver,
            SkillDataService, SkillDataResolver, ClientCurriculumListResolver, AppointmentResolver, SkillDataListResolver, ClockFormatPipe,
            CustomRouteReuseStrategy
        } from './services';
import { CalendarModule } from 'angular-calendar';
import { AuthGuard } from './guards/index';

import {
    HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent, ProfessionalDashboardComponent,
    AddClientComponent, AlertComponent, EditClientComponent, ProfileComponent, CalendarComponent, LinksComponent,
    BackComponent, SkillsComponent, ClientsComponent, ReportsComponent, AddAppointmentComponent,
    AppointmentListComponent, SkillListComponent, AddSkillComponent, CurriculumListComponent, CreateCurriculumComponent,
    CurriculumsComponent, StartAppointmentComponent, AppointmentDetailComponent, AssignCurriculumComponent, RunAppointmentComponent,
    PageNotFoundComponent, AnecdotalComponent, CurriculumSkillListComponent, SelectCurriculumListComponent, DttComponent, DurationComponent,
    RateComponent, FrequencyComponent, EchoicComponent, QuantityComponent, TaskAnalysisComponent, LoadingComponent, WholeIntervalComponent, ClientDashboardComponent,
    ClientBackComponent, ClientLinksComponent, ClientProfileComponent, ClientReportsComponent, ClientCalendarComponent
} from './components/';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent,
        ProfessionalDashboardComponent, AddClientComponent, EditClientComponent, AlertComponent, ProfileComponent,
        CalendarComponent, LinksComponent, BackComponent, SkillsComponent, ClientsComponent, ReportsComponent,
        AddAppointmentComponent, AppointmentListComponent, SkillListComponent, AddSkillComponent, CurriculumListComponent,
        CreateCurriculumComponent, CurriculumsComponent, StartAppointmentComponent, AppointmentDetailComponent, StartAppointmentComponent,
        AssignCurriculumComponent, RunAppointmentComponent, PageNotFoundComponent, AnecdotalComponent, CurriculumSkillListComponent, SelectCurriculumListComponent, 
        DttComponent, DurationComponent, ClockFormatPipe, RateComponent, FrequencyComponent, EchoicComponent, QuantityComponent, TaskAnalysisComponent, LoadingComponent,
        WholeIntervalComponent, ClientDashboardComponent, ClientBackComponent, ClientLinksComponent, ClientProfileComponent, ClientReportsComponent, ClientCalendarComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CalendarModule.forRoot(),
        //MdSliderModule
    ],
    exports: [
        //MdSliderModule
    ],
    providers: [
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler
        },
        { 
            provide: HAMMER_GESTURE_CONFIG, 
            useClass: HammerGestureConfig 
        },
        {
            provide: RouteReuseStrategy, 
            useClass: CustomRouteReuseStrategy
        },
        AuthenticationService, AlertService, UserService, AuthGuard, ClientService,
        ProfessionalService, ClientResolver, ProfessionalResolver, AppointmentService, AppointmentListResolver,
        AddAppointmentResolver, DatePipe, SkillService, SkillResolver, TargetTypeService, DttTypeService, CurriculumListResolver,
        DttTypeResolver, TargetTypeResolver, CurriculumService, CurriculumResolver, ClientCurriculumService ,ClientCurriculumResolver,
        SkillService, SkillResolver, SkillDataService, SkillDataResolver, ClientCurriculumListResolver, AppointmentResolver,  SkillDataListResolver
    ]
})

export class AppModule{}
