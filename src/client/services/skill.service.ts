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
        return this.http.post(this.apiEndpointUrl, skill, this.authService.getAuthRequestOptions())
            .map((response: Response) => response.json() as Skill);
    }
    search(keyword: string) {
        let query = '?organization=' + this.authService.getLoggedInUser().organizationId; 
        
        return this.http.get(this.apiEndpointUrl + '/search/' + keyword + query, this.authService.getAuthRequestOptions())
            .map((response: Response) => response.json() as Array<Skill>);
    }
    update(skill: Skill) {
        return this.http.put(this.apiEndpointUrl + '/' + skill._id, skill, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // update successful - return skill
                let skill = response.json();
                if (skill) {
                    return skill;
                }
            });
    }

    list(query: string) {
        query = query && query.length > 0 ? '?' + query : ''; 
        
        return this.http.get(this.apiEndpointUrl + query, this.authService.getAuthRequestOptions())
                .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skills = response.json() as Array<Skill>;
                return skills;
            });
    }
    get(id: string) {
        return this.http.get(this.apiEndpointUrl + '/' + id, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skill = response.json() as Skill;
                return skill;
            });
    }
    delete(id: string) {
        return this.http.delete(this.apiEndpointUrl + '/' + id, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                let skill = response.json() as Skill;
                return skill;
            });
    }

}
