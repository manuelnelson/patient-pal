import {Skill} from '../models';
export class Curriculum {
    _id: string;
    name: string;
    organization: string;
    skills: Array<Skill>;
}
