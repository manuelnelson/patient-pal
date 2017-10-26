import { Organization } from '../models';
import { Injectable, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthUser } from '../models';
import { Constants } from '../constants';
import 'rxjs/add/operator/map';
import { AuthenticationService, AlertService } from '../services';

@Injectable()
export class BillingService {
    private apiEndpointUrl: string = '/api/billing';
    
    // @Output LoggedIn:
    constructor(private http: Http, private router: Router, private authService: AuthenticationService, private alertService: AlertService) {
    }


    getCustomer(){
        return this.http.get(`${this.apiEndpointUrl}/customers?organizationId=${this.authService.getLoggedInUser().organizationId}`, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let customer = response.json();
                if (customer) {
                    return customer;
                }
            });
    }

    createCustomer(email: String){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let customerObject = {email: email, organizationId: this.authService.getLoggedInUser().organizationId};

        return this.http.post(`${this.apiEndpointUrl}/customers`, customerObject, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let customer = response.json();
                if (customer) {
                    return customer;
                }
            });
    }

    // In stripe jargon, a source is a payment type that is assigned to a customer.  This creates one of these
    createSource(token: String, customer: String){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let sourceObject = {token: token, customer: customer, organizationId: this.authService.getLoggedInUser().organizationId};

        return this.http.post(`${this.apiEndpointUrl}/sources`, sourceObject, options)
            .map((response: Response) => {
                let customer = response.json();
                if (customer) {
                    return customer;
                }
            });

    }
    getSubscription(customer: String){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.apiEndpointUrl}/subscriptions?customer=${customer}&organizationId=${this.authService.getLoggedInUser().organizationId}`, options)
            .map((response: Response) => {
                let subscription = response.json();
                if (subscription) {
                    return subscription;
                }
            });

    }
}
