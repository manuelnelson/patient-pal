import { Professional, Patient } from '../models';
export class Appointment {
    startDate: Date;
    endDate: Date;
    professional: string;
    patient: string;
    location: string;
}
