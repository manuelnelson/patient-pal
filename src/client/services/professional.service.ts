import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Professional, Appointment, ProfessionalApi } from '../models';
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
    create(professional: ProfessionalApi) {
        return this.http.post(this.apiEndpointUrl, professional, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let professional = response.json();
                if (professional) {
                    // console.log(professional);
                }
            });
    }
    update(professional: Professional) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + professional._id, professional, options)
            .map((response: Response) => {
                // update successful - return curriculum
                let professional = response.json();
                if (professional) {
                    return professional;
                }
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
                let professionals = response.json() as Array<Professional>;
                return professionals;
            });
    }
    getAppointments(professionalId: string, month: number = -1, year: number = -1) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `${this.apiEndpointUrl}/${professionalId}/appointments`;
        if(month > -1)
            url += `?month=${month}&year=${year}`;
        return this.http.get(url, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let appointments = response.json() as Appointment[];
                return appointments;
            });
    }

}
