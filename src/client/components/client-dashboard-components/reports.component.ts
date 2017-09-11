
import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService } from '../../services';

@Component({
    selector: 'client-reports-component',
    template: require('./reports.component.html')
})
export class ClientReportsComponent {
    constructor(private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

}
