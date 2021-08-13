import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '../interfaces/classes/IAppointmentRepository';
import IDayAvailabilityObject from '../interfaces/objects/IDayAvailabilityObject';

@injectable()
export default class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository,
    ) {}

    // List all availability hours from current day
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
    }): Promise<IDayAvailabilityObject[]> {
        const appointments = await this.appointmentsRepository.findAllAppointmentsFromProviderByDay(
            {
                provider_id,
                year,
                month,
                day,
            },
        );
        /** appointments must start from 8 am */
        const startingHour = 8;
        /** a day may have at maximum 10 appointments
         * from 8 am to 5pm
         */
        const eachHour = Array.from(
            { length: 10 },
            // increments startingHour until it reaches 17 (5 pm in military hours)
            (_value, index) => index + startingHour,
        );

        const currentDate = new Date(Date.now());
        /** Iterating through each hour and checking if
         * there are any appointments for that particular day */
        const availability = eachHour.map(hour => {
            const hasAppointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );
            /** Hours before currentDate should be removed */
            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    // available if no appointments for that hour
                    // and the hour is after now.
                    !hasAppointmentInHour && isAfter(compareDate, currentDate),
            };
        });
        return availability;
    }
}
