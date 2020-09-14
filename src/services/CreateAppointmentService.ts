import Appointment from '../models/Appointment';7
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

//APENAS REGRAS DE NEGOCIOS
// all the services get the same repository

interface RequestDTO {
    date: Date,
    provider: string
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;
    constructor(appointmentsRepository: AppointmentsRepository) { 
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({date, provider}: RequestDTO): Appointment {

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)
        
        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }  
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;