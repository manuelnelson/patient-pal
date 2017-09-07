import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, AppointmentService } from '../../services';
import { Appointment } from '../../models';
@Injectable()
export class AppointmentResolver implements Resolve<Appointment> {
    constructor(private appointmentService: AppointmentService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Appointment> {
        let appointmentId = route.params['appointmentId'];
        return this.appointmentService.get(appointmentId).map(appointment => appointment).toPromise();
    }
}
