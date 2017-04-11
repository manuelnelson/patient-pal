import { NgModule, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService, AlertService, UserService } from './services';
import { AppRoutingModule }  from './app.routing';
import {
    HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent
} from './components/';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ HomeComponent, NavigationComponent, AppComponent, LoginComponent, SignupComponent],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [ AuthenticationService, AlertService, UserService ]
})
export class AppModule{
}
