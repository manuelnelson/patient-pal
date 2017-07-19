import { ActivatedRoute} from '@angular/router';
import { Component } from '@angular/core';
import { ProfessionalResolver, ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';
@Component({
    template: require('./dashboard.component.html')
})
export class ProfessionalDashboardComponent {
    professional: Professional = null;
    constructor(private profService: ProfessionalService, private authService: AuthenticationService,
        private alertService: AlertService, private route: ActivatedRoute){
            this.professional = this.route.snapshot.data['professional'];
        }
}
