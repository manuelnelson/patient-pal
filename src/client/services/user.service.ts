import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { AuthUser, User } from '../models';
import {AuthenticationService} from '../services';
@Injectable()
export class UserService {
    // @Output LoggedIn:
    constructor(private http: Http, private router: Router, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/users';
    
    create(email: string, password: string, organization: string, role: number) {
        return this.http.post('/api/users', { email: email, password: password, organization: organization, role: role })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json() as AuthUser; 
                this.authService.setLoggedInUser(user);
            });
    }
    //use
    list(query:string) {
        query = query && query.length > 0 ? '?' + query : ''; 
        return this.http.get(this.apiEndpointUrl + query)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let users = response.json() as Array<User>;
                return users;
            });
    }

}
