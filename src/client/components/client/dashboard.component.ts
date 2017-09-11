import { ActivatedRoute} from '@angular/router';
import { Component } from '@angular/core';
import { ProfessionalResolver, ClientService, AlertService, AuthenticationService } from '../../services';
import { Client } from '../../models';
@Component({
    template: require('./dashboard.component.html')
})
export class ClientDashboardComponent {
    client: Client = null;
    constructor(private clientService: ClientService, private authService: AuthenticationService,
        private alertService: AlertService, private route: ActivatedRoute){
            this.client = this.route.snapshot.data['client'];
        }
}
