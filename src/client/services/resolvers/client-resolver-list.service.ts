import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ClientService } from '../../services';
import { Client } from '../../models';
@Injectable()
export class ClientListResolver implements Resolve<Array<Client>> {
    constructor(private clientService: ClientService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Client>> {
        let orgId = this.authService.getLoggedInUser().organizationId; 
        let query = 'organization=' + orgId;
        if(!this.authService.isAdministrator()){
            query += `&professional=${this.authService.getLoggedInUser()._id}`
        }
        return this.clientService.list(query).map(clients => clients).toPromise(); 
    }
}
