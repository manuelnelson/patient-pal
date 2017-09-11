import {Client, Curriculum, Appointment} from '../models';
export class ClientCurriculum {
    _id: string;
    client: Client;
    curriculum: Curriculum;
    appointment: Appointment;
    completed: boolean;
}
