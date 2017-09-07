import {Skill,ClientCurriculum} from '../models';
export class SkillData {
    _id: string;
    skill: Skill;
    clientCurriculum: ClientCurriculum;
    trialNumber: number;
    timerValue: number;
    numberData: number;
    stringData: string;
    notes: string;
}
