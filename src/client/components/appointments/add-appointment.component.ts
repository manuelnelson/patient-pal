import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService, PatientService } from '../../services';
import { Appointment, Patient } from '../../models';
import { Router } from "@angular/router";
@Component({
    selector: 'appointment-form',
    template: require('./add-appointment.component.html')
})
export class AddAppointmentComponent implements OnInit {
    appointmentForm: FormGroup;
    patients: Array<Patient> = null;
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private patientService: PatientService){
        
    }
    ngOnInit(){

        let date = new FormControl('',Validators.pattern(/(0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])[\/\-\.]\d{4}/));
        let patient = new FormControl('');
        let location = new FormControl('');

        this.appointmentForm = new FormGroup({
            date: date,
            patient: patient,
            location: location
        });
    }
    appointment(appointmentValues:Appointment){
        if(this.appointmentForm.valid){
            this.appointmentService.create(appointmentValues).subscribe(
                data => {
                    this.router.navigate(['/professional/appointments']);
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).message);
                });
        }
    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
}
