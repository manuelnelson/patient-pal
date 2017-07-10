import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, PatientService } from '../../services';
import { Patient } from '../../models';
@Injectable()
export class AddAppointmentResolver implements Resolve<Array<Patient>> {
    constructor(private patientService: PatientService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Patient>> {
        //populate patient drop down
        return this.patientService.list()
            .map(patients => patients)
            .toPromise();
    }
}
