import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ClientService, AlertService, AuthenticationService } from '../../services';
import { Client } from '../../models';
import { Router } from "@angular/router";
@Component({
    selector: 'client-form',
    template: require('./add-client.component.html')
})
export class AddClientComponent implements OnInit {
    clientForm: FormGroup;
    clientFormString: string;
    showErrors: boolean = false;
    
    constructor(private clientService:ClientService,private alertService:AlertService, private authService: AuthenticationService,
        private router: Router){

    }
    ngOnInit(){
        let firstname = new FormControl('');
        let lastname = new FormControl('');
        let email = new FormControl('',Validators.email);
        let birth = new FormControl('',Validators.pattern(/\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])/));
        let sex = new FormControl('');
        let insurance = new FormControl('');

        this.clientForm = new FormGroup({
            firstname: firstname,
            lastname: lastname,
            email: email,
            birth: birth,
            sex: sex,
            insurance: insurance
        });
    }
    client(clientValues:Client){
        if(this.clientForm.valid){
            clientValues.organization = this.authService.getLoggedInUser().organizationId;
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
}
