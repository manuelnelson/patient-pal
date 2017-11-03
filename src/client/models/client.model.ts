import {User, Professional} from '../models';
export interface Client extends User {
    firstname: string;
    lastname: string;
    birth: Date;
    sex: string;
    insurance: string;
    organization: string;
    professional: Professional;
}
export interface ClientApi extends User {
    firstname: string;
    lastname: string;
    birth: Date;
    sex: string;
    insurance: string;
    organization: string;
    professional: string;
}
