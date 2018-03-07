import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, TargetSummaryService } from '../../services';
import { TargetSummary } from '../../models';
@Injectable()
export class TargetSummaryResolver implements Resolve<TargetSummary> {
    constructor(private targetSummaryService: TargetSummaryService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TargetSummary> {
        let targetSummaryId = route.params.targetSummaryId;

        return this.targetSummaryService.get(targetSummaryId).map(targetSummary => targetSummary).toPromise();
    }
}
