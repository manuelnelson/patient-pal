import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ClientCurriculumService } from '../../services';
import { ClientCurriculum } from '../../models';
@Injectable()
export class ClientCurriculumResolver implements Resolve<Array<ClientCurriculum>> {
    constructor(private clientCurriculumService: ClientCurriculumService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<ClientCurriculum>> {
        let appointment = route.data["appointment"];
        if(appointment){
            let patientId = appointment._id;
            return this.clientCurriculumService.list(patientId).map(clientCurriculums => clientCurriculums).toPromise();
        }
    }
}
