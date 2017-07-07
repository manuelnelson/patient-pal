import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProfessionalService } from '../../services';
import { Appointment } from '../../models';
@Injectable()
export class AppointmentResolver implements Resolve<Array<Appointment>> {
    constructor(private professionalService: ProfessionalService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Appointment>> {
        //TODO: might need to get from snapshot at some point
        let userId = this.authService.getLoggedInUser()._id;

        return this.professionalService.getAppointments(userId).map(appointments => appointments).toPromise();
    }
}
