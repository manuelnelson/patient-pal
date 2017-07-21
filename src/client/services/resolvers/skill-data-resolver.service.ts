import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, SkillDataService } from '../../services';
import { SkillData } from '../../models';
@Injectable()
export class SkillDataResolver implements Resolve<Array<SkillData>> {
    constructor(private skillDataService: SkillDataService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<SkillData>> {
        return this.skillDataService.list().map(skillDatas => skillDatas).toPromise();
    }
}
