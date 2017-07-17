import { ActivatedRoute} from '@angular/router';
import { Component } from '@angular/core';
import { ProfessionalResolver, ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';
@Component({
    template: require('./page-not-found.component.html')
})
export class PageNotFoundComponent{
    constructor(private alertService: AlertService, private route: ActivatedRoute){

        }
}
