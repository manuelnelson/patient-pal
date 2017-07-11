import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, CurriculumService } from '../../services';
import { Curriculum } from '../../models';
@Injectable()
export class CurriculumResolver implements Resolve<Array<Curriculum>> {
    constructor(private curriculumService: CurriculumService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Curriculum>> {
        return this.curriculumService.list().map(curriculums => curriculums).toPromise();
    }
}
