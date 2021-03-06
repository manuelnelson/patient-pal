import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthUser, User } from '../models';
import { Constants } from '../constants';
import 'rxjs/add/operator/map'
import { AlertService} from '../services';

@Injectable()
export class AuthenticationService {
    public token: string;
    private apiEndpointUrl: string = '/api/auth';
    
    // @Output LoggedIn:
    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string) {
        return this.http.post(`${this.apiEndpointUrl}/login`, { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json() as AuthUser;
                this.setLoggedInUser(user)
                return user;
            });
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.token = null;
    }

    resetPassword(email:string){
        return this.http.post(`${this.apiEndpointUrl}/forgot-password`, { email: email })
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let message = response.json();
            return message;
        })
    }

    updatePassword(email:string, password: string){
        return this.http.put(`${this.apiEndpointUrl}/update/${email}`, { password: password })
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let message = response.json() as User;
            return message;
        })
    }

    getLoggedInUser(){
        let user = localStorage.getItem('currentUser');
        if(user)
            return JSON.parse(user) as AuthUser;
        return null;
    }
    setLoggedInUser(user: AuthUser){
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.token = user.token;
            if(user.role == Constants.Roles.Professional || user.role == Constants.Roles.Admin)
                this.router.navigate(['/professional']);
            else
                this.router.navigate(['/client']);
            
        }
    }
    isProfessional(){
        let user = localStorage.getItem('currentUser');
        if(user){
            let role = (JSON.parse(user) as AuthUser).role;            
            return role !== Constants.Roles.Client;
        }
        return false;
    }
    isAdministrator(){
        let user = localStorage.getItem('currentUser');
        if(user){
            let role = (JSON.parse(user) as AuthUser).role;            
            return role === Constants.Roles.Admin;
        }
        return false;
    }
    isLoggedIn(){
        let user = localStorage.getItem('currentUser');
        if(user) return true;
        return false;
    }

    getAuthRequestOptions(){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.token });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}
