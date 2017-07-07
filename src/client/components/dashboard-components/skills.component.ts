
import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService } from '../../services';

@Component({
    selector: 'skills-component',
    template: require('./skills.component.html')
})
export class SkillsComponent {
    constructor(private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

}
