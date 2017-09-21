import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Organization } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class OrganizationService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/organizations';

    create(organization: Organization) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, organization, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let organization = response.json();
                if (organization) {
                    return organization;
                }
            });
    }
    update(organization: Organization) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + organization._id, organization, options)
            .map((response: Response) => {
                // update successful - return organization
                let organization = response.json();
                if (organization) {
                    return organization;
                }
            });
    }

    list(query:string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let organizations = response.json() as Array<Organization>;
                return organizations;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let organization = response.json() as Organization;
                return organization;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let organization = response.json() as Organization;
                return organization;
            });
    }

}
