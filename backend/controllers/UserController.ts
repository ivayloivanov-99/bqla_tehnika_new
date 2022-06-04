const bcrypt = require("bcrypt");

import {Request, Response} from "express";

import { UserModel } from "../models/UserModel";

import { UserType } from "../types/UserType";


const userModel = new UserModel();

//създава се възможност за логване с имейл и парола
export const login = async (req: Request, res:Response) => {
    const authUser: UserType = req.body;

    const passwordSalt = await bcrypt.genSalt(10);
    const userPassword = bcrypt.hash(authUser.password, passwordSalt);

    authUser.password = userPassword;

    try {
        const user = await userModel.login(authUser);

        if (user) {
            res.status(200).send({
                _id: user.id,
                email: user.email,
                phone: user.phone,
                firstname: user.firstname,
                lastname: user.lastname
            });
        } else {
            res.status(401).send({
                message: 'User could not login successfully! Invalid E-mail and Password combination.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'User could not login succefully!'
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    
}

//регистрирането става с име, имейл, парола
export const register = async (req: Request, res: Response) => {
    try {
        const authUser: UserType = req.body;

        const passwordSalt = await bcrypt.genSalt(10);
        const userPassword = bcrypt.hash(authUser.password, passwordSalt);

        authUser.password = userPassword;

        authUser.created_at = new Date().toISOString();

        await userModel.register(authUser);
        res.status(200).send({
            message: "Successfull registration"
        })
    } catch (error) {
        console.error(error);
        res.status(403).send({
            message: "Register not successful"
        })
    }
}

export const profile = async (req: Request, res: Response) => {

}

export const getUsers = async (req: Request, res: Response) => {
    try {
        res.status(200).send(await userModel.findAll());
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `Users could not successfully be selected!`
        })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        res.status(200).send(await userModel.findOne(id));
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `User with id: ${ id } could not be successfully selected!`
        })
    }
}

export const create = async (req: Request, res: Response) => {
    const user: UserType = req.body;

    try {
        await userModel.create(user);
        res.status(200).send({
            message: `User inserted successfully!`
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `User could not be inserted successfully!`
        })
    }
}

export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user: UserType = req.body;

    try {
        await userModel.update(id, user);
        res.status(200).send({
            message: `User updated successfully!`
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `User could not be updated successfully!`
        })
    }
}

export const destroy = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await userModel.destroy(id);
        res.status(200).send({
            message: `User deleted successfully!`
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `User could not be deleted successfully!`
        })
    }
}