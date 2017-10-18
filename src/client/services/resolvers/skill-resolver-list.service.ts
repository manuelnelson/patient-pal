import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, SkillService } from '../../services';
import { Skill } from '../../models';
@Injectable()
export class SkillListResolver implements Resolve<Array<Skill>> {
    constructor(private skillService: SkillService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Skill>> {
        return this.skillService.list('').map(skills => skills).toPromise();
    }
}
