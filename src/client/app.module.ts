import { NgModule, OnInit, ErrorHandler, isDevMode } from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import {RouteReuseStrategy} from "@angular/router";
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }  from './app.routing';
import { STORES } from './stores';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ImageUploadModule } from 'angular2-image-upload';
import {
            GlobalErrorHandler, AuthenticationService, AlertService, UserService, ClientService, ProfessionalService, ClientResolver,
            ProfessionalResolver, AppointmentService, AppointmentListResolver, AddAppointmentResolver,
            SkillResolver, SkillService, DttTypeService, TargetTypeService, DttTypeResolver, TargetTypeResolver,
            CurriculumService, CurriculumResolver, CurriculumListResolver, ClientCurriculumService, ClientCurriculumResolver,
            SkillDataService, SkillDataResolver, ClientCurriculumListResolver, AppointmentResolver, SkillDataListResolver, ClockFormatPipe,
            CustomRouteReuseStrategy, TimerService, ProfessionalListResolver, AuthGuard, ClientListResolver, BillingService, BillingResolver,
            UpdatePasswordResolver, CurriculumCategoryService, CurriculumCategoryListResolver, SkillListResolver
        } from './services';
import { CalendarModule } from 'angular-calendar';
 

import {
    HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent, ProfessionalDashboardComponent,
    AddClientComponent, AlertComponent, EditClientComponent, ProfileComponent, CalendarComponent, LinksComponent,
    BackComponent, SkillsComponent, ClientsComponent, ReportsComponent, AddAppointmentComponent,
    AppointmentListComponent, SkillListComponent, AddSkillComponent, CurriculumListComponent, CreateCurriculumComponent,
    CurriculumsComponent, StartAppointmentComponent, AppointmentDetailComponent, AssignCurriculumComponent, RunAppointmentComponent,
    PageNotFoundComponent, AnecdotalComponent, CurriculumSkillListComponent, SelectCurriculumListComponent, DttComponent, DurationComponent,
    RateComponent, FrequencyComponent, EchoicComponent, QuantityComponent, TaskAnalysisComponent, LoadingComponent, WholeIntervalComponent, ClientDashboardComponent,
    ClientBackComponent, ClientLinksComponent, ClientProfileComponent, ClientReportsComponent, ClientCalendarComponent, DefaultComponent, ProfessionalsComponent,
    AddProfessionalComponent, BillingComponent, ForgotPasswordComponent, UpdatePasswordComponent, CurriculumComponent, SkillFinderComponent,EditSkillComponent
} from './components/';

let imports = [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot(),
    ImageUploadModule.forRoot()    
];
let exportModules = new Array<any>();
import { MatSliderModule } from '@angular/material';    
imports.push(MatSliderModule)
exportModules.push(MatSliderModule);
// if(process.env.NODE_ENV == 'production'){
//     imports.push(MdSliderModule)
//     exportModules.push(MdSliderModule);
// }
@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent,
        ProfessionalDashboardComponent, AddClientComponent, EditClientComponent, AlertComponent, ProfileComponent,
        CalendarComponent, LinksComponent, BackComponent, SkillsComponent, ClientsComponent, ReportsComponent,
        AddAppointmentComponent, AppointmentListComponent, SkillListComponent, AddSkillComponent, CurriculumListComponent,
        CreateCurriculumComponent, CurriculumsComponent, StartAppointmentComponent, AppointmentDetailComponent, StartAppointmentComponent,
        AssignCurriculumComponent, RunAppointmentComponent, PageNotFoundComponent, AnecdotalComponent, CurriculumSkillListComponent, SelectCurriculumListComponent, 
        DttComponent, DurationComponent, ClockFormatPipe, RateComponent, FrequencyComponent, EchoicComponent, QuantityComponent, TaskAnalysisComponent, LoadingComponent,
        WholeIntervalComponent, ClientDashboardComponent, ClientBackComponent, ClientLinksComponent, ClientProfileComponent, ClientReportsComponent, ClientCalendarComponent,
        DefaultComponent, ProfessionalsComponent, AddProfessionalComponent, BillingComponent, ForgotPasswordComponent, UpdatePasswordComponent, CurriculumComponent,
        SkillFinderComponent, EditSkillComponent
    ],
    imports: imports,
    exports: exportModules,
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
        STORES, AuthenticationService, AlertService, UserService, AuthGuard, ClientService,
        ProfessionalService, ClientResolver, ProfessionalResolver, AppointmentService, AppointmentListResolver,
        AddAppointmentResolver, DatePipe, SkillService, SkillResolver, TargetTypeService, DttTypeService, CurriculumListResolver,
        DttTypeResolver, TargetTypeResolver, CurriculumService, CurriculumResolver, ClientCurriculumService ,ClientCurriculumResolver,
        SkillService, SkillResolver, SkillDataService, SkillDataResolver, ClientCurriculumListResolver, AppointmentResolver,  SkillDataListResolver, 
        TimerService, ProfessionalListResolver, AuthGuard, ClientListResolver, BillingService, BillingResolver, UpdatePasswordResolver,
        CurriculumCategoryListResolver, CurriculumCategoryService, SkillListResolver
    ]
})

export class AppModule{}

