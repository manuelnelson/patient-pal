import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { CurriculumCategory } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class CurriculumCategoryService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/curriculumcategories';

    create(curriculumCategory: CurriculumCategory) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, curriculumCategory, options)
            .map((response: Response) => {
                return response.json() as CurriculumCategory;
            });
    }
    update(curriculumCategory: CurriculumCategory) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + curriculumCategory._id, curriculumCategory, options)
            .map((response: Response) => {
                // update successful - return curriculumCategory
                let curriculumCategory = response.json();
                if (curriculumCategory) {
                    return curriculumCategory;
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
                let curriculumCategorys = response.json() as Array<CurriculumCategory>;
                return curriculumCategorys;
            });
    }
    search(keyword: string) {
        let query = '?organization=' + this.authService.getLoggedInUser().organizationId; 
        
        return this.http.get(this.apiEndpointUrl + '/search/' + keyword + query, this.authService.getAuthRequestOptions())
            .map((response: Response) => response.json() as Array<CurriculumCategory>);
    }

    get(id: string) {
        // add authorization header with jwt token 
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let curriculumCategory = response.json() as CurriculumCategory;
                return curriculumCategory;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let curriculumCategory = response.json() as CurriculumCategory;
                return curriculumCategory;
            });
    }

}
