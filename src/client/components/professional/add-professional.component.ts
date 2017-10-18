import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProfessionalService, AlertService } from '../../services';
import { Professional, ProfessionalApi } from '../../models';
import { Router } from "@angular/router";
@Component({
    selector: 'professional-form',
    template: require('./add-professional.component.html')
})
export class AddProfessionalComponent implements OnInit {
    professionalForm: FormGroup;
    professionalFormString: string;
    showErrors: boolean = false;
    
    constructor(private professionalService:ProfessionalService,private alertService:AlertService,
        private router: Router, private authService: AuthenticationService){

    }
    ngOnInit(){
        let firstname = new FormControl('');
        let lastname = new FormControl('');
        let title = new FormControl('');
        let email = new FormControl('',Validators.email);

        this.professionalForm = new FormGroup({
            firstname: firstname,
            lastname: lastname,
            title: title,
            email: email
        });
    }
    professional(professionalValues:ProfessionalApi){
        if(this.professionalForm.valid){
            professionalValues.organization = this.authService.getLoggedInUser().organizationId;
            this.professionalService.create(professionalValues).subscribe(
                data => {
                    this.router.navigate(['/professional/professionals']);
                },
                error => {
                    this.alertService.errorMessage(JSON.parse(error._body).message);
                    // this.loading = false;
                });
        }
        else
            this.showErrors = true;

    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }
}
