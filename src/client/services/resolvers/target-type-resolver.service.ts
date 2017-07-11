import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, TargetTypeService } from '../../services';
import { TargetType } from '../../models';
@Injectable()
export class TargetTypeResolver implements Resolve<Array<TargetType>> {
    constructor(private targetTypeService: TargetTypeService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<TargetType>> {
        return this.targetTypeService.list().map(targetTypes => targetTypes).toPromise();
    }
}
