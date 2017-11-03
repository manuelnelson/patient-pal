import {Skill, CurriculumCategory} from '../models';
export class Curriculum {
    _id: string;
    name: string;
    organization: string;
    curriculumCategory: CurriculumCategory;
    skills: Array<Skill>;
}
