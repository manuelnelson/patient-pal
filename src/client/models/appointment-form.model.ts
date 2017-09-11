import { Professional, Client } from '../models';
export interface AppointmentForm {
    date: Date;
    startTime: string;
    endTime: string;
    client: string;
    location: string;
}
