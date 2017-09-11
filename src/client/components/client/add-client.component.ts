import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ClientService, AlertService } from '../../services';
import { Client } from '../../models';
import { Router } from "@angular/router";
@Component({
    selector: 'client-form',
    template: require('./add-client.component.html')
})
export class AddClientComponent implements OnInit {
    clientForm: FormGroup;
    clientFormString: string;
    constructor(private clientService:ClientService,private alertService:AlertService,
        private router: Router){

    }
    ngOnInit(){
        let firstname = new FormControl('');
        let lastname = new FormControl('');
        let email = new FormControl('',Validators.email);
        let birth = new FormControl('',Validators.pattern(/(0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])[\/\-\.]\d{4}/));
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
            this.clientService.create(clientValues).subscribe(
                data => {
                    this.router.navigate(['/professional/clients']);
                },
                error => {
                    this.alertService.errorMessage(JSON.parse(error._body).message);
                    // this.loading = false;
                });
        }
    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
}
