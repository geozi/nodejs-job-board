/**
 * User routes.
 * @module src/business/apis/v1/routes/user.route
 */
import { Request, Response } from "express";
import { Router } from "express";
import { updateMiddlewareArray } from "../controllers/user.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { userControllerResponseMessages } from "business/messages/userControllerResponse.message";

export const userRouter = Router();
userRouter.put("/", updateMiddlewareArray);
userRouter.get("/", (req: Request, res: Response) => {
  res.status(httpCodes.OK).json({
    message: userControllerResponseMessages.USER_RETRIEVED,
    data: req.user,
  });
});
