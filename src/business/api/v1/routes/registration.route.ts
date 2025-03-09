/**
 * Registration route.
 * @module src/business/apis/v1/routes/registration.route
 */
import { Router } from "express";
import { registrationMiddlewareArray } from "../controllers/user.controller";

export const regRouter = Router();
regRouter.post("/", registrationMiddlewareArray);
