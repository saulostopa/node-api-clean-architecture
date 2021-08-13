import ICacheProvider from '@shared/providers/interfaces/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentRepository from '../interfaces/classes/IAppointmentRepository';

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    // List all registers of a profession from specific day
    public async execute({
        provider_id,
        year,
        month,
        day,
    }: {
        provider_id: string;
        year: number;
        month: number;
        day: number;
    }): Promise<Appointment[]> {
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
        let appointments = await this.cacheProvider.get<Appointment[]>(
            cacheKey,
        );
        if (!appointments) {
            // Access DB Postgres
            appointments = await this.appointmentsRepository.findAllAppointmentsFromProviderByDay(
                {
                    provider_id,
                    year,
                    month,
                    day,
                },
            );
            // Update cache Redis after get from DB Postgres
            await this.cacheProvider.set(cacheKey, classToClass(appointments));
        }

        return appointments;
    }
}
