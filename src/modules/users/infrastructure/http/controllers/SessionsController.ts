import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
    public async store(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUserService = container.resolve(
            AuthenticateUserService,
        );
        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });
        return response.status(201).json({ user: classToClass(user), token });
    }
}
