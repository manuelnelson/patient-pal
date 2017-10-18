import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { ClientCurriculum, ClientCurriculumApi } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class ClientCurriculumService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/clientCurriculums';

    create(clientCurriculum: ClientCurriculumApi) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, clientCurriculum, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let clientCurriculum = response.json();
                if (clientCurriculum) {
                    return clientCurriculum;
                }
            });
    }
    update(clientCurriculum: ClientCurriculum) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + clientCurriculum._id, clientCurriculum, options)
            .map((response: Response) => {
                // update successful - return clientCurriculum
                let clientCurriculum = response.json();
                if (clientCurriculum) {
                    return clientCurriculum;
                }
            });
    }

    list(query:string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        query = query && query.length > 0 ? '?' + query : ''; 
        return this.http.get(this.apiEndpointUrl + query, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let clientCurriculums = response.json() as Array<ClientCurriculum>;
                return clientCurriculums;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let clientCurriculum = response.json() as ClientCurriculum;
                return clientCurriculum;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let clientCurriculum = response.json() as ClientCurriculum;
                return clientCurriculum;
            });
    }

}
