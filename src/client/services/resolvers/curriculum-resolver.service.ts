import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, CurriculumService } from '../../services';
import { Curriculum } from '../../models';
@Injectable()
export class CurriculumResolver implements Resolve<Curriculum> {
    constructor(private curriculumService: CurriculumService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Curriculum> {
        return this.curriculumService.get(route.params.curriculumId).map(curriculum => curriculum).toPromise();
    }
}
