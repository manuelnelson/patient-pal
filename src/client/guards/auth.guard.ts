import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to home page
        //TODO: figure out how to get current page from router and insert in query string
        this.router.navigate(['/?return=this_page']);
        return false;
    }
}
