import {Skill, Curriculum} from '../models';
export class CurriculumApi {
    //constructor();
    constructor(curriculum:Curriculum){
        this._id = curriculum._id;
        this.name = curriculum.name;
        this.organization = curriculum.organization;
        this.curriculumCategory = curriculum.curriculumCategory ? curriculum.curriculumCategory._id : null;
        this.skills = curriculum.skills ? curriculum.skills : null;
    }
    _id: string;
    name: string;
    organization: string;
    curriculumCategory: string;
    skills: Array<Skill>;
}
