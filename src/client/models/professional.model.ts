import {User, Patient} from '../models';
export interface Professional extends User {
    patients: Array<Patient>;
    firstname: string;
    lastname: string;
}
