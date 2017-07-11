import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Curriculum } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class CurriculumService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/curriculums';

    create(curriculum: Curriculum) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, curriculum, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let curriculum = response.json();
                if (curriculum) {
                    return curriculum;
                }
            });
    }
    update(curriculum: Curriculum) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + curriculum._id, curriculum, options)
            .map((response: Response) => {
                // update successful - return curriculum
                let curriculum = response.json();
                if (curriculum) {
                    return curriculum;
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
                let curriculums = response.json() as Array<Curriculum>;
                return curriculums;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let curriculum = response.json() as Curriculum;
                return curriculum;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let curriculum = response.json() as Curriculum;
                return curriculum;
            });
    }

}
