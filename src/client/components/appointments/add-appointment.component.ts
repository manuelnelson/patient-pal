import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService, AuthenticationService } from '../../services';
import { Appointment, Client, AppointmentForm, AppointmentApi } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'appointment-form',
    template: require('./add-appointment.component.html')
})
export class AddAppointmentComponent implements OnInit {
    appointmentForm: FormGroup;
    clients: Array<Client> = null;
    showErrors: boolean = false;
    
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private datePipe: DatePipe){
        this.clients = this.route.snapshot.data['clients'] as Array<Client>; 
    }
    ngOnInit(){

        let date = new FormControl(this.datePipe.transform(new Date(),'MM/dd/yyyy'),Validators.pattern(/\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])/));
        let startTime = new FormControl('',Validators.pattern(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s?(am|pm|AM|PM)/));
        let endTime = new FormControl('',Validators.pattern(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s?(am|pm|AM|PM)/));
        let client = new FormControl('');
        let location = new FormControl('');

        this.appointmentForm = new FormGroup({
            date: date,
            startTime: startTime,
            endTime: endTime,
            client: client,
            location: location
        });
    }
    appointment(appointmentValues:AppointmentForm){
        if(this.appointmentForm.valid){
            //convert appointment form to direct model entity
            let appointment = new AppointmentApi();
            appointment.startDate = new Date(appointmentValues.date + ' ' + appointmentValues.startTime.ensureSpacingInTime());//custom string extension
            appointment.endDate = new Date(appointmentValues.date + ' ' + appointmentValues.endTime.ensureSpacingInTime());
            appointment.client = appointmentValues.client;
            appointment.professional = this.authService.getLoggedInUser()._id;
            appointment.location = appointmentValues.location;
            this.appointmentService.create(appointment).subscribe(
                data => {
                    this.router.navigate(['/professional/appointments']);
                },
                error => {
                    this.alertService.errorMessage(JSON.parse(error._body).message);
                });
        }
        else
            this.showErrors = true;
    
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }
}
