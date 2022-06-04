import { Request, Response } from "express";

import { CategoryModel } from '../models/CategoryModel';
import { CategoryType } from "../types/CategoryType";

import { ProductModel } from "../models/ProductModel";
import { ProductType } from "../types/ProductType";

const categoryModel = new CategoryModel();
const productModel = new ProductModel();

export const getProducts = async (req: Request, res: Response) => {
    try {
        res.status(200).send(await productModel.findAll());
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `Products could not successfully be selected!`
        })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        res.status(200).send(await productModel.findOne(id));
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `Product with id: ${ id } could not be successfully selected!`
        })
    }
}

export const  productByCategoryID = async (req: Request, res: Response) => {
    const id=+req.params.id;
    try {
        res.send(await productModel.productByCategoryID(id));
    } catch (error) {
        res.status(403).send({
            message: "No products found"
        })
    }
}
export const create = async (req: Request, res: Response) => {
    const product: ProductType = req.body;

    product.created_at = new Date().toISOString();

    try {
        await productModel.create(product);
        res.status(200).send({
            message: `Product inserted successfully!`
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `Product could not be inserted successfully!`
        })
    }
}

export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const product: ProductType = req.body;

    product.updated_at = new Date().toISOString();

    try {
        await productModel.update(id, product);
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
        await productModel.destroy(id);
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

export const publish = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user: ProductType = req.body;

    user.published_at = new Date().toISOString();
    user.updated_at = new Date().toISOString();

    try {
        await productModel.publish(id, user);
        res.status(200).send({
            message: `User published successfully!`
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `User could not be published successfully!`
        })
    }
}
