import { Professional, Patient } from '../models';
export interface AppointmentForm {
    date: Date;
    startTime: string;
    endTime: string;
    patient: string;
    location: string;
}
