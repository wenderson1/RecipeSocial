import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../models/user';
import { authMiddleware } from '../middlewares/authMiddleware';
import bcrypt from 'bcryptjs';


class UserController{

    index(request: Request, response: Response) {
        return response.send({userID:request.userId});
    }

    async getUser(request: Request, response: Response) {
        
        const repository = getRepository(User);
        const id = request.userId;

        const userData = await repository.findOne({id})
        
        return response.send(userData.id);

    }

    async createUser(request: Request, response: Response) {
        const repository = getRepository(User);
        const { username, email, password } = request.body;

        const userEmailExists = await repository.findOne({ email });
         const userUsernameExists = await repository.findOne({  username });

        if (userEmailExists) {
            return response.sendStatus(409);
        }

        if (userUsernameExists) {
            return response.sendStatus(409);
        }

        const user = repository.create({ username, email, password });
        await repository.save(user);

        return response.status(201).json(user);
    }

    async updateUser(request: Request, response: Response) {
        const repository = getRepository(User);
        const { username, email, password } = request.body;
        const id = request.userId;
        const userData = await repository.findOne({id})
        
        const userUsernameExists = await repository.findOne({ email });
        const userEmailExists = await repository.findOne({ username });

        if (userEmailExists) {
            return response.sendStatus(409).send("Email already exists");
        }

        if (userUsernameExists) {
            return response.sendStatus(409).send("Username already exists");
        }

         request.body.password = bcrypt.hashSync(password, 8);

        const user = repository
            .createQueryBuilder()
            .update(User)
            .set({ username: username, email: email, password: password })
            .where("id = :id", { id: id })
            .execute();
            
         return response.status(200).json(user);
        
    }

    


}

export default new UserController();