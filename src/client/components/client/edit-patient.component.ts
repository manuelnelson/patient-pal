import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { PatientService, AlertService, AuthenticationService } from '../../services';
import { Patient } from '../../models';
import { DatePipe } from "@angular/common";

@Component({
    selector: 'edit-patient-form',
    providers: [DatePipe],
    template: require('./edit-patient.component.html')
})
export class EditPatientComponent implements OnInit {
    editPatientForm: FormGroup;
    patientFormString: string;
    editPatient: Patient;
    formSucess: boolean;
    formError: boolean;
    constructor(private patientService:PatientService,private alertService:AlertService, private authService: AuthenticationService,
                private route: ActivatedRoute, private datePipe: DatePipe){
        this.editPatient = this.route.snapshot.data['patient'];
        console.log(this.route.snapshot)
    }
    ngOnInit(){
        let date = this.datePipe.transform(this.editPatient.birth, 'MM/dd/yyyy');
        let firstname = new FormControl(this.editPatient.firstname || '');
        let lastname = new FormControl(this.editPatient.lastname || '');
        let email = new FormControl(this.editPatient.email || '');
        let birth = new FormControl(date,Validators.pattern(/(0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])[\/\-\.]\d{4}/));
        let sex = new FormControl(this.editPatient.sex || '');
        let insurance = new FormControl(this.editPatient.insurance || '');

        this.editPatientForm = new FormGroup({
            firstname: firstname,
            lastname: lastname,
            email: email,
            birth: birth,
            sex: sex,
            insurance: insurance
        });
    }
    patient(patientValues:Patient){
        if(this.editPatientForm.valid){
            patientValues._id = this.editPatient._id;
            this.patientService.update(patientValues).subscribe(
                data => {
                    console.log(data);
                    this.formSucess = true;
                    this.formError = false;
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).message);
                    this.formSucess = false;
                    this.formError = true;
                });
        }
    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
}
