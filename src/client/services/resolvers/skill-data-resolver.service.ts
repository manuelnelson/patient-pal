import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, SkillDataService } from '../../services';
import { SkillData } from '../../models';
@Injectable()
export class SkillDataResolver implements Resolve<SkillData> {
    constructor(private skillDataService: SkillDataService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SkillData> {
        let skillDataId = route.params['skillDataId'];
        return this.skillDataService.get(skillDataId).map(skillData => skillData).toPromise();
    }
}
