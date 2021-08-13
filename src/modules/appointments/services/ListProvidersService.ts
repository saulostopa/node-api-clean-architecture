import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';
import ICacheProvider from '@shared/providers/interfaces/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
export default class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    // List all professional created
    public async execute(except_user_id: string): Promise<User[]> {
        let users = await this.cacheProvider.get<User[]>(
            `providers-list:${except_user_id}`,
        );

        if (!users) {
            users = await this.userRepository.except(except_user_id);
            await this.cacheProvider.set(
                `providers-list:${except_user_id}`,
                classToClass(users),
            );
        }

        return users;
    }
}
