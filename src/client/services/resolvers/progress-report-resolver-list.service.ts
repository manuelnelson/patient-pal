import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProgressReportService } from '../../services';
import { ProgressReport } from '../../models';
@Injectable()
export class ProgressReportListResolver implements Resolve<Array<ProgressReport>> {
    constructor(private progressReportService: ProgressReportService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<ProgressReport>> {
        return this.progressReportService.list('').map(progressReports => progressReports).toPromise();
    }
}
