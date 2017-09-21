import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, OrganizationService } from '../../services';
import { Organization } from '../../models';
@Injectable()
export class OrganizationListResolver implements Resolve<Array<Organization>> {
    constructor(private organizationService: OrganizationService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Organization>> {
        return this.organizationService.list('').map(organizations => organizations).toPromise();
    }
}
