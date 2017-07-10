import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService, AuthenticationService } from '../../services';
import { Appointment, Patient, AppointmentForm } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'appointment-form',
    template: require('./add-appointment.component.html')
})
export class AddAppointmentComponent implements OnInit {
    appointmentForm: FormGroup;
    patients: Array<Patient> = null;
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private datePipe: DatePipe){
        this.patients = this.route.snapshot.data['patients'];
    }
    ngOnInit(){

        let date = new FormControl(this.datePipe.transform(new Date(),'MM/dd/yyyy'),Validators.pattern(/(0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])[\/\-\.]\d{4}/));
        let startTime = new FormControl('',Validators.pattern(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s?(am|pm|AM|PM)/));
        let endTime = new FormControl('',Validators.pattern(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s?(am|pm|AM|PM)/));
        let patient = new FormControl('');
        let location = new FormControl('');

        this.appointmentForm = new FormGroup({
            date: date,
            startTime: startTime,
            endTime: endTime,
            patient: patient,
            location: location
        });
    }
    appointment(appointmentValues:AppointmentForm){
        if(this.appointmentForm.valid){
            //convert appointment form to direct model entity
            let appointment = new Appointment();
            appointment.startDate = new Date(appointmentValues.date + ' ' + appointmentValues.startTime.ensureSpacingInTime());//custom string extension
            appointment.endDate = new Date(appointmentValues.date + ' ' + appointmentValues.endTime.ensureSpacingInTime());
            appointment.patient = appointmentValues.patient;
            appointment.professional = this.authService.getLoggedInUser()._id;
            appointment.location = appointmentValues.location;
            this.appointmentService.create(appointment).subscribe(
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
