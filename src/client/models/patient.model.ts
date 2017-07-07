import {User} from './user.model';
export interface Patient extends User {
    firstname: String;
    lastname: String;
    birth: Date;
    sex: String;
    insurance: String;
}
