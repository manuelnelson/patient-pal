import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Appointment, AppointmentApi } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class AppointmentService {
    // @Output LoggedIn:
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/appointments';

    create(appointment: AppointmentApi) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, appointment, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let appointment = response.json();
                return appointment;
            });
    }
    // update(appointment: Appointment) {
    //     // add authorization header with jwt token
    //     let headers = new Headers({ 'Authorization': this.authService.token });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.put(this.apiEndpointUrl + '/' + appointment._id, appointment, options)
    //         .map((response: Response) => {
    //             // update successful - return appointment
    //             let appointment = response.json();
    //             return appointment;
    //         });
    // }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let appointment = response.json() as Appointment;
                return appointment;
            });
    }
    list(query: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        query = query && query.length > 0 ? '?' + query : ''; 
        return this.http.get(this.apiEndpointUrl + query, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let appointments = response.json() as Array<Appointment>;
                return appointments;
            });
    }

}
