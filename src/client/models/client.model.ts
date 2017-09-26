import {User} from './user.model';
export interface Client extends User {
    firstname: string;
    lastname: string;
    birth: Date;
    sex: string;
    insurance: string;
    organization: string;
}
