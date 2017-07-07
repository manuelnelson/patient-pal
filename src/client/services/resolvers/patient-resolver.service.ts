import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, PatientService } from '../../services';
import { Patient } from '../../models';
@Injectable()
export class PatientResolver implements Resolve<Patient> {
    constructor(private patientService: PatientService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Patient> {
        let userId = route.params['userId'];
        if(!userId)
            userId = this.authService.getLoggedInUser()._id;

        return this.patientService.get(userId).map(patient => patient ? patient[0] : null).toPromise();
    }
}
