import { NgModule }                from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent, ProfessionalDashboardComponent, AddPatientComponent } from './components';

const routes: Routes = [
    // Root
    // { path: 'home',  component: HomeComponent},
    { path: '',  component: HomeComponent},
    { path: 'professional',  component:ProfessionalDashboardComponent },
    { path: 'patients/add',  component:AddPatientComponent }
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
