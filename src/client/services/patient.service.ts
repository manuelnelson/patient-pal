import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Patient } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class PatientService {
    // @Output LoggedIn:
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/patients';

    create(patient: Patient) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, patient, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let patient = response.json();
                if (patient) {
                    console.log(patient);
                }
            });
    }
    update(patient: Patient) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + patient._id, patient, options)
            .map((response: Response) => {
                // update successful - return patient
                let patient = response.json();
                if (patient) {
                    return patient;
                }
            });
    }
    get(userId: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '?userId=' + userId, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let patient = response.json() as Patient;
                return patient;
            });
    }

}
