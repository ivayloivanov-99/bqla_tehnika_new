import {Router} from "express";
import {
    getProducts,
    getProduct,
    create,
    update,
    destroy,
    productByCategoryID
} from "../controllers/CatalogController";

export const CatalogRouter = Router();

CatalogRouter.get('/products', getProducts);
CatalogRouter.get('/products/:id', getProduct);
CatalogRouter.post('/products', create);
CatalogRouter.put('/products/:id', update);
CatalogRouter.delete('/products/:id', destroy);
CatalogRouter.get('/product/category/:id', productByCategoryID);
