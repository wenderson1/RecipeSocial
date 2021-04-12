import { Request, Response } from 'express';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { User }from '../../models/user';
import { UserRepository } from '../../repositories/UsersRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController{



    async authenticate(request: Request, response: Response) {
        const repository = getRepository(User);
        const { email, password } = request.body;

        const user = await repository.findOne({ where: { email } });
        
        if (!user) {
            return response.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.sendStatus(401);
        }

        delete user.password;
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

        return response.json({ user, token });

    }


}

export default new AuthController();