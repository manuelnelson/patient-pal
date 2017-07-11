import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { DttType } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class DttTypeService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/dtttypes';

    create(dttType: DttType) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, dttType, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let dttType = response.json();
                if (dttType) {
                    return dttType;
                }
            });
    }
    update(dttType: DttType) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + dttType._id, dttType, options)
            .map((response: Response) => {
                // update successful - return dttType
                let dttType = response.json();
                if (dttType) {
                    return dttType;
                }
            });
    }

    list() {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let dttTypes = response.json() as Array<DttType>;
                return dttTypes;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let dttType = response.json() as DttType;
                return dttType;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let dttType = response.json() as DttType;
                return dttType;
            });
    }

}
