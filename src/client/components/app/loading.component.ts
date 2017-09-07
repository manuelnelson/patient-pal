import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
import { Router } from '@angular/router';
@Component({
    selector: 'loading',
    template: require('./loading.component.html')
})
export class LoadingComponent {

    constructor(private authService:AuthenticationService,private alertService:AlertService,
                private router: Router){
    }
}
