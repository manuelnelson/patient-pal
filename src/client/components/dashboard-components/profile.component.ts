
import { Component, OnInit, Input,  } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService, AppointmentService } from '../../services';
import { Professional, Appointment, FileHolder } from '../../models';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,  } from '@angular/router';
import { Constants } from '../../constants';
@Component({
    selector: 'profile-component',
    template: require('./profile.component.html')
})
export class ProfileComponent implements OnInit{
    @Input() profile: Professional; 
    profileForm: FormGroup;
    upcomingAppointment: Appointment;
    constants: any;
    uploadUrl: string;
    editMode: boolean = false;
    uploadInProgress: boolean=false;
    constructor(private profService: ProfessionalService, private authService: AuthenticationService,
        private alertService: AlertService, private router: Router, private appointmentService: AppointmentService)
    {
        this.constants = Constants;        
    }


    ngOnInit(){
        this.uploadUrl = `/api/photos/professional/${this.profile._id}`;

        let firstname = new FormControl(this.profile.firstname);
        let lastname = new FormControl(this.profile.lastname);
        let title = new FormControl(this.profile.title);
        
        this.profileForm = new FormGroup({
            firstname: firstname,
            lastname: lastname,
            title: title,
        });

        let currentDate = new Date().toISOString();
        let query = 'startDate=' + currentDate + '&professional=' + this.profile._id;
        this.appointmentService.list(query).subscribe(appointments => {
            this.upcomingAppointment = appointments && appointments.length > 0 ? appointments[0] : null;
            console.log(this.upcomingAppointment)
        });

    }
    updateProfile(profileValues:Professional){
        if(this.profileForm.valid){
            this.profile.firstname = profileValues.firstname;
            this.profile.lastname = profileValues.lastname;
            this.profile.title = profileValues.title;
            this.profService.update(this.profile).subscribe(
                data => {
                    this.editMode = false;
                },
                error => {
                    this.alertService.error(error);
                });
        }
    }

    imageUploaded(file: FileHolder){
        this.editMode = false;
        console.log(file)
    }
    imagePending(state: boolean){
        this.uploadInProgress = state;
        //console.log(file.serverResponse.response)
    }

    enableEditMode(){
        this.editMode = true;
    }
    cancelEditMode(){
        this.editMode = false;
    }

}
