import {Patient, Curriculum, Appointment} from '../models';
export class ClientCurriculum {
    _id: string;
    client: Patient;
    curriculum: Curriculum;
    appointment: Appointment;
    completed: boolean;
}
