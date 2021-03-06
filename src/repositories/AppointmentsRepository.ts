import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';


interface CreateAppointmentDTO {
    date: Date;
    provider: string;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public create({provider, date}: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({provider, date});
        this.appointments.push(appointment)
        return appointment;
    }

    public all(): Appointment[] {
        return this.appointments
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(
            app => isEqual(app.date, date))

        return findAppointment || null;
    }
} 

export default AppointmentsRepository;
