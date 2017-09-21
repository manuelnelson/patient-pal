
import { Component, OnInit, Input } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';

@Component({
    selector: 'links-component',
    template: require('./links.component.html')
})
export class LinksComponent {
    @Input() profile: Professional;
    isAdministrator: boolean = false;
    constructor(private profService: ProfessionalService, private authService: AuthenticationService,
        private alertService: AlertService)
    {
        this.isAdministrator = this.authService.isAdministrator();
    }
}
