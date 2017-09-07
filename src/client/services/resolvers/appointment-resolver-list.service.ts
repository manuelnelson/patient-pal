import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProfessionalService, AppointmentService } from '../../services';
import { Appointment } from '../../models';
@Injectable()
export class AppointmentListResolver implements Resolve<Array<Appointment>> {
    constructor(private professionalService: ProfessionalService, private router: Router, private authService: AuthenticationService,
        private appointmentService: AppointmentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Appointment>> {
        let userId = this.authService.getLoggedInUser()._id;
        return this.professionalService.getAppointments(userId).map(appointments => appointments).toPromise();
    }
}
