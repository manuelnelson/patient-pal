import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, MasteredSkillService } from '../../services';
import { MasteredSkill } from '../../models';
@Injectable()
export class masteredSkillResolver implements Resolve<MasteredSkill> {
    constructor(private MasteredSkillService: MasteredSkillService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<MasteredSkill> {
        let masteredSkillId = route.params.masteredSkillId;

        return this.MasteredSkillService.get(masteredSkillId).map(MasteredSkill => MasteredSkill).toPromise();
    }
}
