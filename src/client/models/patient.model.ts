import {User} from './user.model';
export interface Patient extends User {
    birth: Date;
    sex: String;
    insurance: String;
}
