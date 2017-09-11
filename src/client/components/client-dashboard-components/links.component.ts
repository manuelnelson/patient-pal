
import { Component, OnInit, Input } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Client } from '../../models';

@Component({
    selector: 'client-links-component',
    template: require('./links.component.html')
})
export class ClientLinksComponent {
    @Input() profile: Client;
    constructor(private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }
}
