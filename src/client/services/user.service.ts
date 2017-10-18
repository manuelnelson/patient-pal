import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { AuthUser } from '../models';
import {AuthenticationService} from '../services';
@Injectable()
export class UserService {
    // @Output LoggedIn:
    constructor(private http: Http, private router: Router, private authService: AuthenticationService) { }

    create(email: string, password: string, organization: string, role: number) {
        return this.http.post('/api/users', { email: email, password: password, organization: organization, role: role })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json() as AuthUser; 
                this.authService.setLoggedInUser(user);
            });
    }

}
