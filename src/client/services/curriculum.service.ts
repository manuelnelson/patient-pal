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
        return this.http.post(this.apiEndpointUrl, curriculum, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let curriculum = response.json();
                if (curriculum) {
                    return curriculum;
                }
            });
    }
    update(curriculum: Curriculum) {
        return this.http.put(this.apiEndpointUrl + '/' + curriculum._id, curriculum, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // update successful - return curriculum
                let curriculum = response.json();
                if (curriculum) {
                    return curriculum;
                }
            });
    }

    list(query:string) {
        if(!query || query.indexOf('organization') === -1)
            query = 'organization=' + this.authService.getLoggedInUser().organizationId;
        
        query = query && query.length > 0 ? '?' + query : '';  
        return this.http.get(this.apiEndpointUrl + query, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let curriculums = response.json() as Array<Curriculum>;
                return curriculums;
            });
    }
    get(id: string) {
        return this.http.get(this.apiEndpointUrl + '/' + id, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let curriculum = response.json() as Curriculum;
                return curriculum;
            });
    }
    delete(id: string) {
        return this.http.delete(this.apiEndpointUrl + '/' + id, this.authService.getAuthRequestOptions())
            .map((response: Response) => {
                let curriculum = response.json() as Curriculum;
                return curriculum;
            });
    }
    
    search(keyword: string) {
        let query = '?organization=' + this.authService.getLoggedInUser().organizationId;
        return this.http.get(this.apiEndpointUrl + '/search/' + keyword + query, this.authService.getAuthRequestOptions())
            .map((response: Response) => response.json() as Array<Curriculum>);
    }

}
