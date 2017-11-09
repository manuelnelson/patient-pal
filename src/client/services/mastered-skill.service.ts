import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { MasteredSkill } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class MasteredSkillService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/masteredSkills';

    create(MasteredSkill: MasteredSkill) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, MasteredSkill, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let MasteredSkill = response.json();
                if (MasteredSkill) {
                    return MasteredSkill;
                }
            });
    }
    update(MasteredSkill: MasteredSkill) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + MasteredSkill._id, MasteredSkill, options)
            .map((response: Response) => {
                // update successful - return MasteredSkill
                let MasteredSkill = response.json();
                if (MasteredSkill) {
                    return MasteredSkill;
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
                let masteredSkills = response.json() as Array<MasteredSkill>;
                return masteredSkills;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let MasteredSkill = response.json() as MasteredSkill;
                return MasteredSkill;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let MasteredSkill = response.json() as MasteredSkill;
                return MasteredSkill;
            });
    }

}
