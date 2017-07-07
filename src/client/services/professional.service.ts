import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Professional, Appointment } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class ProfessionalService {
    // @Output LoggedIn:
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/professionals';

    get(id:string){
        return this.http.get(this.apiEndpointUrl + '/' + id, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                return response.json() as Professional;
            });
    }
    create(professional: Professional) {
        return this.http.post(this.apiEndpointUrl, professional, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let professional = response.json();
                if (professional) {
                    console.log(professional);
                }
            });
    }
    getAppointments(professionalId: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + professionalId + '/appointments', options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let appointments = response.json() as Appointment[];
                return appointments;
            });
    }

}
