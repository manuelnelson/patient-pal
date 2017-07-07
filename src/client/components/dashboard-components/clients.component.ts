import { ActivatedRoute} from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';

@Component({
    selector: 'clients-component',
    template: require('./clients.component.html')
})
export class ClientsComponent {
    professional: Professional;
    constructor(private authService: AuthenticationService,
        private alertService: AlertService, private route: ActivatedRoute)
    {
        this.professional = this.route.snapshot.data['professional'];
    }
}
