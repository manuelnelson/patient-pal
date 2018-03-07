import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProgressReportService } from '../../services';
import { ProgressReport } from '../../models';
@Injectable()
export class ProgressReportResolver implements Resolve<ProgressReport> {
    constructor(private progressReportService: ProgressReportService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ProgressReport> {
        let progressReportId = route.params.progressReportId;

        return this.progressReportService.get(progressReportId).map(progressReport => progressReport).toPromise();
    }
}
