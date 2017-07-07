import { Professional, Patient } from '../models';
export interface Appointment {
    date: Date;
    professional: Professional;
    patient: Patient;
    location: string;
}
