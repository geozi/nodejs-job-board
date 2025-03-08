/**
 * User routes.
 * @module src/business/apis/v1/routes/user.route
 */
import { Router } from "express";
import {
  updateMiddlewareArray,
  retrievalByEmailMiddlewareArray,
  retrievalByUsernameMiddlewareArray,
} from "../controllers/user.controller";

export const userRouter = Router();
userRouter.put("/", ...updateMiddlewareArray);
userRouter.get("/email", ...retrievalByEmailMiddlewareArray);
userRouter.get("/username", retrievalByUsernameMiddlewareArray);
