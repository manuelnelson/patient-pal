import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../models';
import { Constants } from '../constants';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    // @Output LoggedIn:
    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string) {
        return this.http.post('/api/auth/login', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json() as User;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    if(user.role == Constants.Roles.Professional)
                        this.router.navigate(['/professional']);
                    else{
                        //TODO: add route to patient page
                        console.log('is patient!');
                    }
                    this.token = user.token;
                    return user;
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.token = null;
    }
    getLoggedInUser(){
        var user = localStorage.getItem('currentUser');
        if(user)
            return JSON.parse(user) as User;
        return null;
    }
    isLoggedIn(){
        var user = localStorage.getItem('currentUser');
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
