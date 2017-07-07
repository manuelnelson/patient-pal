
import { Component, OnInit, Input } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';

@Component({
    selector: 'profile-component',
    template: require('./profile.component.html')
})
export class ProfileComponent implements OnInit{
    @Input() profile: Professional;
    constructor(private profService: ProfessionalService, private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

    ngOnInit(){
        console.log(this.profile)
    }
}
