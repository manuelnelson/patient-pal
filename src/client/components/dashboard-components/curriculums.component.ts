
import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService } from '../../services';

@Component({
    selector: 'curriculums-component',
    template: require('./curriculums.component.html')
})
export class CurriculumsComponent {
    constructor(private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

}
