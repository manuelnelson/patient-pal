
import { Component, OnInit, Input } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';

@Component({
    selector: 'links-component',
    template: require('./links.component.html')
})
export class LinksComponent implements OnInit{
    @Input() profile: Professional;
    constructor(private profService: ProfessionalService, private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

    ngOnInit(){
        
    }
}
