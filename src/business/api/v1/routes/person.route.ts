/**
 * Person routes.
 * @module src/business/apis/v1/routes/person.route
 */
import { Router } from "express";
import {
  infoCreationMiddlewareArray,
  infoRetrievalByUsernameMiddlewareArray,
  infoUpdateMiddlewareArray,
} from "../controllers/person.controller";

export const personRouter = Router();
personRouter.post("/", infoCreationMiddlewareArray);
personRouter.put("/", infoUpdateMiddlewareArray);
personRouter.get("/username", infoRetrievalByUsernameMiddlewareArray);
