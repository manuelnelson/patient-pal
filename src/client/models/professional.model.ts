import {User, Client} from '../models';
export interface Professional extends User {
    clients: Array<Client>;
    firstname: string;
    lastname: string;
    title: string;
}
