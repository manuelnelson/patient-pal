import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProfessionalService } from '../../services';
import { Professional } from '../../models';
@Injectable()
export class ProfessionalListResolver implements Resolve<Array<Professional>> {
    constructor(private professionalService: ProfessionalService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Professional>> {
        let orgId = this.authService.getLoggedInUser().organizationId;
        let query = 'organization=' + orgId;
        return this.professionalService.list(query).map(professionals => professionals).toPromise(); 
    }
}
