import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, TargetSummaryService } from '../../services';
import { TargetSummary } from '../../models';
@Injectable()
export class TargetSummaryListResolver implements Resolve<Array<TargetSummary>> {
    constructor(private targetSummaryService: TargetSummaryService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<TargetSummary>> {
        return this.targetSummaryService.list('').map(targetSummarys => targetSummarys).toPromise();
    }
}
