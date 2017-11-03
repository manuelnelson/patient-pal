import { Injectable } from '@angular/core';
import {AuthenticationService} from '../../services';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard {

    constructor( private authService : AuthenticationService, private router : Router ) {
    }

    canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
        if(!this.authService.isLoggedIn()) return this.navigateToLogin();
        let allowedRoles = route.data['roles'] as Array<number>;      
        if(this.isInRole(allowedRoles))
            return true;
        return this.navigateToLogin();
        
    }

    navigateToLogin(){
        this.router.navigate(['/'],{queryParams: {showLogin:true}});
    }
    isInRole(allowedRoles: Array<number>): boolean{
        let currentUser = this.authService.getLoggedInUser();
        if(allowedRoles.indexOf(currentUser.role) > -1)
            return true;
        return false;
    }


}