import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService } from '../../services';
import { Appointment } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import { Constants } from '../../constants';

@Component({
    selector: 'appointment-detail',
    template: require('./appointment-detail.component.html')
})
export class AppointmentDetailComponent implements OnInit {
    appointment: Appointment;
    dateFormat: string;
    timeFormat: string;
    constants: any;
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            this.appointment = this.route.snapshot.data["appointment"] != null ? this.route.snapshot.data["appointment"][0] : null;
            this.constants = Constants;
    }
    ngOnInit(){
    }
}
