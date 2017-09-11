import { Professional, Client } from '../models';
export class Appointment {
    _id: string;
    startDate: Date;
    endDate: Date;
    professional: Professional;
    client: Client;
    location: string;
}
