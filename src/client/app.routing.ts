import { NgModule }                from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './constants';
// Components
import { HomeComponent, ProfessionalDashboardComponent, AddClientComponent,
    EditClientComponent, LinksComponent, CalendarComponent, SkillsComponent,
    ClientsComponent, ReportsComponent, AddAppointmentComponent, AppointmentListComponent,
    SkillListComponent, AddSkillComponent, CurriculumListComponent, CreateCurriculumComponent,
    CurriculumsComponent, StartAppointmentComponent, AssignCurriculumComponent, RunAppointmentComponent,
    PageNotFoundComponent, CurriculumSkillListComponent, LoadingComponent, ClientDashboardComponent, ClientLinksComponent, 
    ClientReportsComponent, ClientCalendarComponent, DefaultComponent, ProfessionalsComponent, AddProfessionalComponent, ClientBackComponent

} from './components';
import { ClientResolver, ProfessionalResolver, AppointmentListResolver,
    AddAppointmentResolver, DttTypeResolver, TargetTypeResolver, SkillResolver, CurriculumResolver,
    ClientCurriculumResolver, ClientCurriculumListResolver, AppointmentResolver, SkillDataListResolver, CurriculumListResolver,
    ProfessionalListResolver, AuthGuard, ClientListResolver
} from './services';

const routes: Routes = [
    // Root
    // { path: 'home',  component: HomeComponent},
    { path: '',  component: HomeComponent},
    { path: 'loading',  component: LoadingComponent},
    {
        path: 'professional',
        component:ProfessionalDashboardComponent,
        resolve: {professional: ProfessionalResolver},
        canActivate: [AuthGuard],  
        data: {roles: [Constants.Roles.Admin,Constants.Roles.Professional]},      
        children: [
            { path: '', redirectTo: 'links', pathMatch: 'full' },
            { path: 'links', component: LinksComponent },
            {
                path: 'skills',
                component: SkillsComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full'},
                    { path: 'list', pathMatch: 'full', component: SkillListComponent, resolve: {skills:SkillResolver}},
                    { path: 'add',  pathMatch: 'full', component: AddSkillComponent, resolve: {targetTypes: TargetTypeResolver, dttTypes: DttTypeResolver}}
                ]
            },
            {
                path: 'curriculums',
                component: CurriculumsComponent, 
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full'},
                    { path: 'list', pathMatch: 'full', component: CurriculumListComponent, resolve: {curriculums:CurriculumListResolver}},
                    { path: 'view/:curriculumId', component: SkillListComponent, resolve: {curriculum:CurriculumResolver}}
                ]
            },
            { path: 'clients', component: ClientsComponent, resolve: {professional: ProfessionalResolver, clients: ClientListResolver} },
            { path: 'reports', component: ReportsComponent, resolve: {professional: ProfessionalResolver} },
            {
                path: 'appointments',
                component: CalendarComponent,
                resolve: {appointments: AppointmentListResolver},
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full'},
                    { path: 'list', pathMatch: 'full', component: AppointmentListComponent, resolve: {appointments: AppointmentListResolver}},
                    { path: 'add',  pathMatch: 'full', component: AddAppointmentComponent, resolve: {clients: AddAppointmentResolver}}
                ]
            },
            { path: 'professionals', component: ProfessionalsComponent, resolve: {professional: ProfessionalResolver, professionals: ProfessionalListResolver} },
        ]
    },
    { 
        path: 'professionals/add', 
        component: AddProfessionalComponent,
        canActivate: [AuthGuard],  
        data: {roles: [Constants.Roles.Admin]},      

    },    
    {
        path: 'client',
        component:ClientDashboardComponent,
        resolve: {client: ClientResolver},
        children: [
            { path: '', redirectTo: 'links', pathMatch: 'full' },
            { path: 'links', component: ClientLinksComponent },
            { path: 'reports', component: ClientReportsComponent },
            {
                path: 'appointments',
                component: ClientCalendarComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full'},
                    { path: 'list', pathMatch: 'full', component: AppointmentListComponent, resolve: {appointments: AppointmentListResolver}}
                ]
            },
        ]
    },
    { path: 'clients/add',  component:AddClientComponent },
    { path: 'clients/edit/:userId',  component:EditClientComponent, pathMatch: 'full', resolve:{client:ClientResolver} },
    { path: 'clients/edit',  component:EditClientComponent, pathMatch: 'full' },
    {
        path: 'appointments/:appointmentId/start',
        component:StartAppointmentComponent,
        resolve:{appointment: AppointmentResolver},
        children: [
            { path: '', redirectTo: 'assign', pathMatch: 'full'}, 
            { path: 'assign', component: AssignCurriculumComponent, pathMatch: 'full', resolve:{existingClientCurriculums: ClientCurriculumListResolver}},
            { path: 'client-curriculum/:clientCurriculumId/navigation', component: CurriculumSkillListComponent, pathMatch: 'full', resolve:{clientCurriculum: ClientCurriculumResolver, skillData: SkillDataListResolver}},
            { path: 'client-curriculum/:clientCurriculumId/skill/:skillId', component: RunAppointmentComponent, pathMatch: 'full', resolve: {clientCurriculum: ClientCurriculumResolver, dttTypes: DttTypeResolver}}
        ]
    },
    { path: 'reports',  component:DefaultComponent, pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
        { enableTracing: true } // <-- debugging purposes only
    ),

  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
