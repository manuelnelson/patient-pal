import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, CurriculumService } from '../../services';
import { Curriculum } from '../../models';
@Injectable()
export class CurriculumListResolver implements Resolve<Array<Curriculum>> {
    constructor(private curriculumService: CurriculumService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Curriculum>> {
        let orgId = this.authService.getLoggedInUser().organizationId; 
        let query = 'organization=' + orgId;

        return this.curriculumService.list(query).map(curriculums => curriculums).toPromise();
    }
}
