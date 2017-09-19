
import { ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService, ClientService } from '../../services';
import { Client, Professional } from '../../models';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'reports-component',
    template: require('./reports.component.html')
})
export class ReportsComponent implements OnInit{
    students: Array<Client>;
    professional: Professional;
    reportsForm: FormGroup;
    
    constructor(private authService: AuthenticationService, private alertService: AlertService, private clientService: ClientService, 
        private route: ActivatedRoute, private router: Router)
    { 
        this.professional = this.route.snapshot.data['professional']; 
        this.students = this.professional.clients;
    }
    


    public ngOnInit(): void {
        let student = new FormControl('');
        let startDate = new FormControl(moment(new Date().setHours(-7*24)).format('YYYY-MM-DD'),Validators.pattern(/\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])/));
        let endDate = new FormControl(moment(new Date()).format('YYYY-MM-DD'), Validators.pattern(/\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])/));

        this.reportsForm = new FormGroup({
            student: student,
            startDate: startDate,
            endDate: endDate
        });
    }
    generateReport(reportValues:any){
        if(this.reportsForm.valid){
            let query = `client=${reportValues.student}&startDate=${reportValues.startDate}&endDate=${reportValues.endDate}`
            window.open(`/server/reports?${query}`);
            //this.router.navigate(['/server/reports']);
            // this.clientService.create(clientValues).subscribe(
            //     data => {
            //         this.router.navigate(['/professional/clients']);
            //     },
            //     error => {
            //         this.alertService.errorMessage(JSON.parse(error._body).message);
            //         // this.loading = false;
            //     });
        }
    }

    
    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }

}
