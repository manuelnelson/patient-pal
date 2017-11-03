import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, CurriculumCategoryService } from '../../services';
import { CurriculumCategory } from '../../models';
@Injectable()
export class CurriculumCategoryResolver implements Resolve<CurriculumCategory> {
    constructor(private curriculumCategoryService: CurriculumCategoryService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CurriculumCategory> {
        let curriculumCategoryId = route.params.curriculumCategoryId;

        return this.curriculumCategoryService.get(curriculumCategoryId).map(curriculumCategory => curriculumCategory).toPromise();
    }
}
