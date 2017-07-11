import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { Skill } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class SkillService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/skills';

    create(skill: Skill) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, skill, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skill = response.json();
                if (skill) {
                    return skill;
                }
            });
    }
    update(skill: Skill) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + skill._id, skill, options)
            .map((response: Response) => {
                // update successful - return skill
                let skill = response.json();
                if (skill) {
                    return skill;
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
                let skills = response.json() as Array<Skill>;
                return skills;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skill = response.json() as Skill;
                return skill;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let skill = response.json() as Skill;
                return skill;
            });
    }

}
