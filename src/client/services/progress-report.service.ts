import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { ProgressReport } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class ProgressReportService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/progressReports';

    create(progressReport: ProgressReport) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, progressReport, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let progressReport = response.json();
                if (progressReport) {
                    return progressReport;
                }
            });
    }
    update(progressReport: ProgressReport) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + progressReport._id, progressReport, options)
            .map((response: Response) => {
                // update successful - return progressReport
                let progressReport = response.json();
                if (progressReport) {
                    return progressReport;
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
                let progressReports = response.json() as Array<ProgressReport>;
                return progressReports;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let progressReport = response.json() as ProgressReport;
                return progressReport;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let progressReport = response.json() as ProgressReport;
                return progressReport;
            });
    }

}
