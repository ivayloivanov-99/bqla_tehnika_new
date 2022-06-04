import { Router } from "express";
import { getIndex } from "../controllers/IndexController";

export const IndexRouter = Router();

IndexRouter.get("/", getIndex);