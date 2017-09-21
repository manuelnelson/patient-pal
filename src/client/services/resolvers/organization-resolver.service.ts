import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, OrganizationService } from '../../services';
import { Organization } from '../../models';
@Injectable()
export class OrganizationResolver implements Resolve<Organization> {
    constructor(private organizationService: OrganizationService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Organization> {
        let organizationId = route.params.organizationId;

        return this.organizationService.get(organizationId).map(organization => organization).toPromise();
    }
}
