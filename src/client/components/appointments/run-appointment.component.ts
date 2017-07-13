import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService } from '../../services';
import { Appointment } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'start-appointment',
    template: require('./start-appointment.component.html')
})
export class StartAppointmentComponent implements OnInit {
    appointment: Appointment;
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            this.appointment = this.route.snapshot.data["appointment"];
    }
    ngOnInit(){
    }
}
