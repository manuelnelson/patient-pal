import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ClientService } from '../../services';
import { Client } from '../../models';
@Injectable()
export class AddAppointmentResolver implements Resolve<Array<Client>> {
    constructor(private clientService: ClientService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Client>> {
        //populate client drop down
        return this.clientService.list('')
            .map(clients => clients)
            .toPromise();
    }
}
