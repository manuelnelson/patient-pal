import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { SkillData, SkillDataApi } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class SkillDataService {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/skillDatas';

    create(skillData: SkillDataApi) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, skillData, options)
        
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skillData = response.json();
                if (skillData) {
                    return skillData;
                }
            });
    }
    update(skillData: SkillData) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + skillData._id, skillData, options)
            .map((response: Response) => {
                // update successful - return skillData
                let skillData = response.json();
                if (skillData) {
                    return skillData;
                }
            });
    }

    list(clientCurriculumId: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '?clientCurriculum=' + clientCurriculumId, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skillDatas = response.json() as Array<SkillData>;
                return skillDatas;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skillData = response.json() as SkillData;
                return skillData;
            });
    }
    getLatest(skillId: string, clientCurriculumId: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '?skill=' + skillId + '&clientCurriculum=' + clientCurriculumId, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let skillData = response.json() as Array<SkillData>;
                if(skillData && skillData.length > 0)
                    return skillData[0];
                return null;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let skillData = response.json() as SkillData;
                return skillData;
            });
    }

    buildApiModel(skillId: string, clientCurriculumId:string, trial: number, numberData: number, stringData: string, notes:string, timerValue: number) : SkillDataApi {
        let skillData = new SkillDataApi();
        skillData.skill = skillId;
        skillData.clientCurriculum = clientCurriculumId;
        skillData.trialNumber = trial;
        skillData.numberData = numberData;
        skillData.stringData = stringData;
        skillData.notes = notes;
        skillData.timerValue = timerValue;
        return skillData;
    }
}
