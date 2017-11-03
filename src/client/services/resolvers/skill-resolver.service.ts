import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, SkillService } from '../../services';
import { Skill } from '../../models';
@Injectable()
export class SkillResolver implements Resolve<Skill> {
    constructor(private skillService: SkillService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Skill> {
        return this.skillService.get(route.params.id).map(skill => skill).toPromise();
    }
}
