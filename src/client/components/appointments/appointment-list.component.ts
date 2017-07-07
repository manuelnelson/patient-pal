import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService } from '../../services';
import { Appointment } from '../../models';
import { Router } from "@angular/router";
@Component({
    selector: 'appointment-list',
    template: require('./appointment-list.component.html')
})
export class AppointmentListComponent implements OnInit {
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router){
    }
    ngOnInit(){
    }
}
