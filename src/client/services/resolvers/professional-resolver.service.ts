import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProfessionalService } from '../../services';
import { Professional } from '../../models';
@Injectable()
export class ProfessionalResolver implements Resolve<Professional> {
    constructor(private professionalService: ProfessionalService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Professional> {
        let id = this.authService.getLoggedInUser()._id;
        return this.professionalService.get(id).map(professional => professional).toPromise(); 
    }
}
