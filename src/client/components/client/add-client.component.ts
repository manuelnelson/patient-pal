import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ClientService, AlertService, AuthenticationService, ProfessionalService } from '../../services';
import { Client, Professional, ClientApi } from '../../models';
import { Router } from "@angular/router";
@Component({
    selector: 'client-form',
    template: require('./add-client.component.html')
})
export class AddClientComponent implements OnInit {
    clientForm: FormGroup;
    clientFormString: string;
    showErrors: boolean = false;
    searchResults: Array<Professional> = null;    
    isAdministrator: boolean = false;
    searchInProgress: boolean = false;    
    
    constructor(private clientService:ClientService,private alertService:AlertService, private authService: AuthenticationService,
        private router: Router, private professionalService: ProfessionalService){
            this.isAdministrator = this.authService.isAdministrator();
    }
    ngOnInit(){
        let firstname = new FormControl('');
        let lastname = new FormControl('');
        let email = new FormControl('',Validators.email);
        let birth = new FormControl('',Validators.pattern(/\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])/));
        let sex = new FormControl('');
        let keyword = new FormControl('');
        let professional = new FormControl('');
        let insurance = new FormControl('');

        this.clientForm = new FormGroup({
            firstname: firstname,
            lastname: lastname,
            email: email,
            birth: birth,
            sex: sex,
            keyword: keyword,
            professional: professional,
            insurance: insurance
        });
    }
    client(clientValues:ClientApi){
        if(this.clientForm.valid){
            clientValues.organization = this.authService.getLoggedInUser().organizationId;
            if(!this.authService.isAdministrator())
                clientValues.professional = this.authService.getLoggedInUser()._id;
            //if administrator and no professional assigned, assign admin to client
            else if(this.authService.isAdministrator() && clientValues.professional.length === 0)
                clientValues.professional = this.authService.getLoggedInUser()._id;
            this.clientService.create(clientValues).subscribe(
                data => {
                    this.router.navigate(['/professional/clients']);
                },
                error => {
                    this.alertService.error(error);
                    // this.loading = false;
                });
        }
        else
            this.showErrors = true;

    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }

    search(){
        if(this.clientForm.controls.keyword.value && this.clientForm.controls.keyword.value.length > 1 && !this.searchInProgress){
            this.searchInProgress = true;
            this.professionalService.search(this.clientForm.controls.keyword.value)
                .subscribe(results => {
                    this.searchInProgress = false;
                    this.searchResults = results
                },
                error => {
                    this.alertService.error(error);
                });
        }
    }
    selectProfessional(professional: Professional){
        this.searchResults = null;
        this.clientForm.controls.professional.setValue(professional._id);
        this.clientForm.controls.keyword.setValue(`${professional.firstname} ${professional.lastname}`);
        //this.clientForm.controls. // set(category.name);
    }

}
