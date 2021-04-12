import { Router } from 'express';
import { app } from './index';
import authMiddleware from './app/middlewares/authMiddleware';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController'
import RecipeController from './app/controllers/RecipeController'

const router = Router();

router.post("/users", UserController.createUser);
router.post("/auth", AuthController.authenticate);
router.get("/users", authMiddleware, UserController.index);
router.get("/getdata", authMiddleware, UserController.getUser);
router.put("/update", authMiddleware, UserController.updateUser);

router.post("/createRecipe/", RecipeController.createRecipe);

export default router;