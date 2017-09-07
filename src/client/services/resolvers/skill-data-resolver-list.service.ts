import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, SkillDataService } from '../../services';
import { SkillData } from '../../models';
@Injectable()
export class SkillDataListResolver implements Resolve<Array<SkillData>> {
    constructor(private router: Router, private authService: AuthenticationService,
        private skillDataService: SkillDataService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<SkillData>> {
        let clientCurriculumId = route.params['clientCurriculumId'];

        return this.skillDataService.list(clientCurriculumId).map(skillData => skillData).toPromise();
    }
}
