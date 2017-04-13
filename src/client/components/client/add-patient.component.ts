import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { PatientService, AlertService } from '../../services';
import { Patient } from '../../models';
@Component({
    selector: 'patient-form',
    template: require('./add-patient.component.html')
})
export class AddPatientComponent implements OnInit {
    patientForm: FormGroup;
    patientFormString: string;
    constructor(private patientService:PatientService,private alertService:AlertService){

    }
    ngOnInit(){
        let firstName = new FormControl('');
        let lastName = new FormControl('');
        let email = new FormControl('',Validators.email);
        let birth = new FormControl('',Validators.pattern(/(0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])[\/\-\.]\d{4}/));
        let sex = new FormControl('');
        let insurance = new FormControl('');

        this.patientForm = new FormGroup({
            firstName: firstName,
            lastName: lastName,
            email: email,
            birth: birth,
            sex: sex,
            insurance: insurance
        });
    }
    patient(patientValues:Patient){
        if(this.patientForm.valid){
            this.patientService.create(patientValues).subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).message);
                    // this.loading = false;
                });
        }
    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
}
