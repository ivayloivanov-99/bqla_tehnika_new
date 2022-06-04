//зареждаме .env конфигурационен файл 
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ debug: true });
}

//cors дава възможност на дадено API по сигурен начин да достъпва APIтата от друг домейн
const cors = require("cors");
const corsOptions = {
    origin: `http://${ process.env.FRONTEND_HOST }:${ process.env.FRONTEND_PORT }`
};

import express = require("express");

import {Application, json} from "express";

import {IndexRouter} from "./routers/IndexRouter";
import {UserRouter} from "./routers/UserRouter";
import {CatalogRouter} from "./routers/CatalogRouter";

const app: Application = express();

app.use(cors(corsOptions));

app.use(json());

app.use("/api", IndexRouter);
app.use('/api/user', UserRouter);
app.use('/api/catalog', CatalogRouter);

//проверява се дали дадения потребител е администратор
export const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({
        message: 'Admin Token is not valid.' });
};

//бекенда работи на 8080 порт
if (process.env.BACKEND_PORT) {
    app.listen(process.env.BACKEND_PORT, () => {
        console.log("Backend Started at http://localhost:" + process.env.BACKEND_PORT);
    })
} else {
    app.listen(8080, () => {
        console.log("Backend Started at http://localhost:8080");
    })
}