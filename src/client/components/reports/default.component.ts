import { ActivatedRoute} from '@angular/router';
import { Component } from '@angular/core';
import { ProfessionalResolver, ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';
@Component({
    template: require('./default.component.html')
})
export class DefaultComponent {
    constructor(private profService: ProfessionalService, private authService: AuthenticationService,
        private alertService: AlertService, private route: ActivatedRoute){
        }
}
