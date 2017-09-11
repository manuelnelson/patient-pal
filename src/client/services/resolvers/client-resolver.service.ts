import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, ClientService } from '../../services';
import { Client } from '../../models';
@Injectable()
export class ClientResolver implements Resolve<Client> {
    constructor(private clientService: ClientService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Client> {
        let id = this.authService.getLoggedInUser()._id;
        if(route.params.userId){
            id = route.params.userId;
        }
        return this.clientService.get(id).map(client => client).toPromise();
    }
}
