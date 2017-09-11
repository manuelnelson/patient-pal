import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ProfessionalService, AppointmentService, ClientService } from '../../services';
import { Appointment } from '../../models';
@Injectable()
export class AppointmentListResolver implements Resolve<Array<Appointment>> {
    constructor(private professionalService: ProfessionalService, private router: Router, private authService: AuthenticationService,
        private appointmentService: AppointmentService, private clientService: ClientService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Appointment>> {
        let user = this.authService.getLoggedInUser();
        if(this.authService.isProfessional()){
            return this.professionalService.getAppointments(user._id).map(appointments => appointments).toPromise();            
        }
        return this.clientService.getAppointments(user._id).map(appointments => appointments).toPromise();            
    }
}
