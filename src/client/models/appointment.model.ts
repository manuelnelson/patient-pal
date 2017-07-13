import { Professional, Patient } from '../models';
export class Appointment {
    _id: string;
    startDate: Date;
    endDate: Date;
    professional: Professional;
    patient: Patient;
    location: string;
}
