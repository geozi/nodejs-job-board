import { Request, Response } from "express";
import { userRegistrationRules } from "../middleware/user.rules";
import { validationResult } from "express-validator";
import { appLogger } from "../../../../../logs/logger.config";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraintError.class";
import { reqBodyToUser } from "../../../mappers/user.mapper";
import { createUser } from "../../../../service/user.service";
import { userControllerResponseMessages } from "../../../messages/userControllerResponse.message";

export const registrationMiddlewareArray = [
  ...userRegistrationRules(),
  async function registerUser(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${registerUser.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const newUser = await reqBodyToUser(req);
      const savedUser = await createUser(newUser);

      res.status(httpCodes.CREATED).json({
        message: userControllerResponseMessages.USER_REGISTERED,
        data: savedUser,
      });
    } catch (error) {
      if (
        error instanceof ServerError ||
        error instanceof UniqueConstraintError
      ) {
        appLogger.error(
          `User controller: ${registerUser.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
