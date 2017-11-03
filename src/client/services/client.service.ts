import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Client, Appointment, ClientApi } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class ClientService {
    // @Output LoggedIn:
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/clients';

    create(client: ClientApi) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, client, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let client = response.json();
                if (client) {
                    return client;
                }
            });
    }
    update(client: Client) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + client._id, client, options)
            .map((response: Response) => {
                // update successful - return client
                let client = response.json();
                if (client) {
                    return client;
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
                let clients = response.json() as Array<Client>;
                return clients;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let client = response.json() as Client;
                return client;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let client = response.json() as Client;
                return client;
            });
    }
    getAppointments(clientId: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + clientId + '/appointments', options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let appointments = response.json() as Appointment[];
                return appointments;
            });
    }

}
