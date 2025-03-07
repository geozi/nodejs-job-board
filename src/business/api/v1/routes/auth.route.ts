/**
 * Authentication routes.
 * @module src/business/apis/v1/routes/auth.route
 */
import { userLoginMiddlewareArray } from "../../../../auth/auth.controller";
import { Router } from "express";

export const authRouter = Router();
authRouter.post("/", userLoginMiddlewareArray);
