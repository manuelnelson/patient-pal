import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, DttTypeService } from '../../services';
import { DttType } from '../../models';
@Injectable()
export class DttTypeResolver implements Resolve<Array<DttType>> {
    constructor(private dttTypeService: DttTypeService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<DttType>> {
        return this.dttTypeService.list().map(dttTypes => dttTypes).toPromise();
    }
}
