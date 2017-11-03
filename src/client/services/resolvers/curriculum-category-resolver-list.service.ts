import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, CurriculumCategoryService } from '../../services';
import { CurriculumCategory } from '../../models';
@Injectable()
export class CurriculumCategoryListResolver implements Resolve<Array<CurriculumCategory>> {
    constructor(private curriculumCategoryService: CurriculumCategoryService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<CurriculumCategory>> {
        return this.curriculumCategoryService.list('').map(curriculumCategorys => curriculumCategorys).toPromise();
    }
}
