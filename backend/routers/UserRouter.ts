import { Router } from "express";
import { login, logout, register, profile, getUsers, getUser, create, update, destroy} from "../controllers/UserController"

export const UserRouter = Router();

UserRouter.post('/login', login);
UserRouter.post('/logout', logout);

UserRouter.post('/register', register);

UserRouter.get('/profile', profile);

UserRouter.get('/users', getUsers);
UserRouter.get('/users/:id', getUser);
UserRouter.post('/users', create);
UserRouter.put('/users/:id', update);
UserRouter.delete('/users/:id', destroy)