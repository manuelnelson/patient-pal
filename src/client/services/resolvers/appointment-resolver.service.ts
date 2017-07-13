import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProfessionalService, AppointmentService } from '../../services';
import { Appointment } from '../../models';
@Injectable()
export class AppointmentResolver implements Resolve<Array<Appointment>> {
    constructor(private professionalService: ProfessionalService, private router: Router, private authService: AuthenticationService,
        private appointmentService: AppointmentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Appointment>> {
        //if we have appointmentId, fetch appointment
        //else, get appointments by login Id
        if(route.params.appointmentId){
            return this.appointmentService.get(route.params.appointmentId).map(appointments => new Array<Appointment>(appointments)).toPromise();
        } else {
            let userId = this.authService.getLoggedInUser()._id;
            return this.professionalService.getAppointments(userId).map(appointments => appointments).toPromise();
        }
    }
}
