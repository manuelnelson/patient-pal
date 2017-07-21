import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ClientCurriculumService } from '../../services';
import { ClientCurriculum } from '../../models';
@Injectable()
export class ClientCurriculumResolver implements Resolve<ClientCurriculum> {
    constructor(private clientCurriculumService: ClientCurriculumService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ClientCurriculum> {
        let clientCurriculumId = route.params.clientCurriculumId;

        return this.clientCurriculumService.get(clientCurriculumId).map(clientCurriculum => clientCurriculum).toPromise();
    }
}
