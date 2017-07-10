import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService } from '../../services';
import { Appointment } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'appointment-list',
    template: require('./appointment-list.component.html')
})
export class AppointmentListComponent implements OnInit {
    appointments: Array<Appointment>;
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            this.appointments = this.route.snapshot.data["appointments"];
    }
    ngOnInit(){
    }
}
