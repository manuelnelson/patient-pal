import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ClientCurriculumService } from '../../services';
import { ClientCurriculum, Appointment } from '../../models';
@Injectable()
export class ClientCurriculumListResolver implements Resolve<Array<ClientCurriculum>> {
    constructor(private clientCurriculumService: ClientCurriculumService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<ClientCurriculum>> {        
        let appointment = route.parent.data.appointment;
        //console.log(route.parent.data.appointment);
        
        if(appointment){
            return this.clientCurriculumService.list(appointment.patient._id, false).map(clientCurriculums => clientCurriculums).toPromise();
        }
        
    }
}
