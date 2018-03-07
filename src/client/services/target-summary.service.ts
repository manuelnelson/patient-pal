import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { TargetSummary } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class TargetSummaryService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/targetSummarys';

    create(targetSummary: TargetSummary) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, targetSummary, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let targetSummary = response.json();
                if (targetSummary) {
                    return targetSummary;
                }
            });
    }
    update(targetSummary: TargetSummary) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + targetSummary._id, targetSummary, options)
            .map((response: Response) => {
                // update successful - return targetSummary
                let targetSummary = response.json();
                if (targetSummary) {
                    return targetSummary;
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
                let targetSummarys = response.json() as Array<TargetSummary>;
                return targetSummarys;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let targetSummary = response.json() as TargetSummary;
                return targetSummary;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let targetSummary = response.json() as TargetSummary;
                return targetSummary;
            });
    }

}
