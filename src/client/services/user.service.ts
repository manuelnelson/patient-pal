import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
    // @Output LoggedIn:
    constructor(private http: Http) { }

    create(email: string, password: string, role: string) {
        return this.http.post('/api/users', { email: email, password: password, role: role })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

}
