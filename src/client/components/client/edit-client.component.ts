import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { ClientService, AlertService, AuthenticationService } from '../../services';
import { Client } from '../../models';
import { DatePipe } from "@angular/common";
import { Constants } from '../../constants';
@Component({
    selector: 'edit-client-form',
    providers: [DatePipe],
    template: require('./edit-client.component.html')
})
export class EditClientComponent implements OnInit {
    editClientForm: FormGroup;
    clientFormString: string;
    editClient: Client;
    isProfessional: boolean;
    formSucess: boolean;
    formError: boolean;
    showErrors: boolean = false;
    
    constructor(private clientService:ClientService,private alertService:AlertService, private authService: AuthenticationService,
                private route: ActivatedRoute, private datePipe: DatePipe){
        this.editClient = this.route.snapshot.data['client'];
        this.isProfessional = this.authService.getLoggedInUser().role !== Constants.Roles.Client;
    }
    ngOnInit(){
        let date = this.datePipe.transform(this.editClient.birth, 'MM/dd/yyyy');
        let firstname = new FormControl(this.editClient.firstname || '');
        let lastname = new FormControl(this.editClient.lastname || '');
        let email = new FormControl(this.editClient.email || '');
        //let birth = new FormControl(date,Validators.pattern(/\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])/));
        let birth = new FormControl(date,Validators.pattern(/(0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])[\/\-\.]\d{4}/));
        let sex = new FormControl(this.editClient.sex || '');
        let insurance = new FormControl(this.editClient.insurance || '');

        this.editClientForm = new FormGroup({
            firstname: firstname,
            lastname: lastname,
            email: email,
            birth: birth,
            sex: sex,
            insurance: insurance
        });
    }
    client(clientValues:Client){
        if(this.editClientForm.valid){
            clientValues._id = this.editClient._id;
            this.clientService.update(clientValues).subscribe(
                data => {
                    this.formSucess = true;
                    this.formError = false;
                },
                error => {
                    this.alertService.error(error);
                    this.formSucess = false;
                    this.formError = true;
                });
        }
        else
            this.showErrors = true;
    
    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }
}
