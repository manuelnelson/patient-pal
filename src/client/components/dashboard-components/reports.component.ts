
import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService } from '../../services';

@Component({
    selector: 'reports-component',
    template: require('./reports.component.html')
})
export class ReportsComponent {
    constructor(private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

}
