import { Component, OnInit, Input } from '@angular/core';
import { ClientService, AlertService, AuthenticationService, AppointmentService } from '../../services';
import { Client, Appointment } from '../../models';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../../constants';

@Component({
    selector: 'client-profile-component',
    template: require('./profile.component.html')
})
export class ClientProfileComponent implements OnInit{
    @Input() profile: Client;
    profileForm: FormGroup;
    upcomingAppointment: Appointment;
    constants: any;
    editMode: boolean = false;
    constructor(private clientService: ClientService, private authService: AuthenticationService,
        private alertService: AlertService, private router: Router, private appointmentService: AppointmentService)
    {
        this.constants = Constants;        
    }


    ngOnInit(){
        let firstname = new FormControl(this.profile.firstname);
        let lastname = new FormControl(this.profile.lastname);
        
        this.profileForm = new FormGroup({
            firstname: firstname,
            lastname: lastname,
        });

        let currentDate = new Date().toISOString();
        let query = 'startDate=' + currentDate + '&client=' + this.profile._id;
        this.appointmentService.list(query).subscribe(appointments => {
            this.upcomingAppointment = appointments && appointments.length > 0 ? appointments[0] : null;
            console.log(this.upcomingAppointment)
        });

    }
    updateProfile(profileValues:Client){
        if(this.profileForm.valid){
            this.profile.firstname = profileValues.firstname;
            this.profile.lastname = profileValues.lastname;
            this.clientService.update(this.profile).subscribe(
                data => {
                    this.editMode = false;
                },
                error => {
                    this.alertService.errorMessage(JSON.parse(error._body).message);
                    // this.loading = false;
                });
        }
    }

    enableEditMode(){
        this.editMode = true;
    }

}
