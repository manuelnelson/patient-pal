import { ActivatedRoute} from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';

@Component({
    selector: 'professionals-component',
    template: require('./professionals.component.html')
})
export class ProfessionalsComponent {
    administrator: Professional;
    professionals: Array<Professional>;
    constructor(private authService: AuthenticationService, private alertService: AlertService, private route: ActivatedRoute)
    {        
        this.administrator = this.route.snapshot.data['professional'];  
        this.professionals = this.route.snapshot.data['professionals'];
    }
}
