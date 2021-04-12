import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../../models/user';
import { Recipe } from '../../models/recipe';
import { authMiddleware } from '../middlewares/authMiddleware';
import { v4 as uuid} from 'uuid';



class RecipeController{

    index(request: Request, response: Response) {
        return response.send({userID:request.userId});
    }

    async createRecipe(request: Request, response: Response) {
        const repository = getRepository(Recipe);
        const {ingredients, preparation_mode } = request.body;
        let like = 0;
        let dislike = 0
        const recipe_id = uuid();
        const id = request.userId;



        const repository1 = getRepository(User);
        
        const userData = await repository1.findOne({id})
        
      

        response.send({userID:request.userId});

        const recipe = await getConnection().createQueryBuilder().insert().into(Recipe).values({
          id:recipe_id,  ingredients: ingredients, preparation_mode: preparation_mode, like: like, dislike: dislike, user: userData
        }).execute();



        return response.status(201);
       
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


}

export default new RecipeController();