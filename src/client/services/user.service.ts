import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
    // @Output LoggedIn:
    constructor(private http: Http, private router: Router) { }

    create(email: string, password: string, role: number) {
        return this.http.post('/api/users', { email: email, password: password, role: role })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.router.navigate(['/professional']);
                }
            });
    }

}
