import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, MasteredSkillService } from '../../services';
import { MasteredSkill } from '../../models';
@Injectable()
export class MasteredSkillListResolver implements Resolve<Array<MasteredSkill>> {
    constructor(private MasteredSkillService: MasteredSkillService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<MasteredSkill>> {
        let clientCurriculumId = route.params.clientCurriculumId;
        let query = `clientCurriculum=${clientCurriculumId}`;        
        return this.MasteredSkillService.list(query).map(masteredSkills => masteredSkills).toPromise();
    }
}
