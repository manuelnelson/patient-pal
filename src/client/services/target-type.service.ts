import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { TargetType } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class TargetTypeService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/targetTypes';

    create(targetType: TargetType) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, targetType, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let targetType = response.json();
                if (targetType) {
                    return targetType;
                }
            });
    }
    update(targetType: TargetType) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + targetType._id, targetType, options)
            .map((response: Response) => {
                // update successful - return targetType
                let targetType = response.json();
                if (targetType) {
                    return targetType;
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
                let targetTypes = response.json() as Array<TargetType>;
                return targetTypes;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let targetType = response.json() as TargetType;
                return targetType;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let targetType = response.json() as TargetType;
                return targetType;
            });
    }

}
