import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class PatientService {
    // @Output LoggedIn:
    constructor(private http: Http) { }
    private apiEndpointUrl: string = '/api/patients';

    create(patient: Patient) {
        return this.http.post(this.apiEndpointUrl, patient)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let patient = response.json();
                if (patient) {
                    console.log(patient);
                }
            });
    }

}
