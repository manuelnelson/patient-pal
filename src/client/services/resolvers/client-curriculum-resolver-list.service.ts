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
            let query = `client=${appointment.client._id}&completed=false`;
            return this.clientCurriculumService.list(query).map(clientCurriculums => clientCurriculums).toPromise();
        }
        
    }
}
