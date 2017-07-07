import { NgModule }                from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent, ProfessionalDashboardComponent, AddPatientComponent,
    EditPatientComponent, LinksComponent, CalendarComponent, SkillsComponent,
ClientsComponent, ReportsComponent, AddAppointmentComponent, AppointmentListComponent } from './components';
import { PatientResolver, ProfessionalResolver, AppointmentResolver } from './services';

const routes: Routes = [
    // Root
    // { path: 'home',  component: HomeComponent},
    { path: '',  component: HomeComponent},
    {
        path: 'professional',
        component:ProfessionalDashboardComponent,
        resolve: {professional: ProfessionalResolver},
        children: [
            { path: '', redirectTo: 'links', pathMatch: 'full' },
            { path: 'links', component: LinksComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'clients', component: ClientsComponent, resolve: {professional: ProfessionalResolver} },
            { path: 'reports', component: ReportsComponent },
            {
                path: 'appointments',
                component: CalendarComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full'},
                    { path: 'list', pathMatch: 'full', component: AppointmentListComponent, resolve: {appointments: AppointmentResolver}},
                    { path: 'add',  pathMatch: 'full', component: AddAppointmentComponent}
                ]
            },
        ]
    },
    { path: 'patients/add',  component:AddPatientComponent },
    { path: 'patients/edit/:userId',  component:EditPatientComponent, pathMatch: 'full', resolve:{patient:PatientResolver} },
    { path: 'patients/edit',  component:EditPatientComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
