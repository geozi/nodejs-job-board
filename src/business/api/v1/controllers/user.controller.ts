import { Request, Response } from "express";
import {
  userDeletionRules,
  userRegistrationRules,
  userUpdateRules,
} from "../middleware/user.rules";
import { validationResult } from "express-validator";
import { appLogger } from "../../../../../logs/logger.config";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraintError.class";
import {
  reqBodyToUser,
  reqBodyToUserId,
  reqBodyToUserUpdate,
} from "../../../mappers/user.mapper";
import {
  bringUserToDate,
  createUser,
  removeUser,
} from "../../../../service/user.service";
import { userControllerResponseMessages } from "../../../messages/userControllerResponse.message";
import { NotFoundError } from "../../../../errors/notFoundError.class";

export const registrationMiddlewareArray = [
  ...userRegistrationRules(),
  async function callUserRegistration(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callUserRegistration.name} -> Express validation errors detected and caught`
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
          `User controller: ${callUserRegistration.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const updateMiddlewareArray = [
  ...userUpdateRules(),
  async function callUserUpdate(req: Request, res: Response): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callUserUpdate.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const userToUpdate = await reqBodyToUserUpdate(req);
      const updatedUser = await bringUserToDate(userToUpdate);

      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_UPDATED,
        data: updatedUser,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `User controller: ${callUserUpdate.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const removalMiddlewareArray = [
  ...userDeletionRules(),
  async function callUserRemoval(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callUserRemoval.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const id = reqBodyToUserId(req);
      await removeUser(id);

      res.status(httpCodes.NO_CONTENT).json({});
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `User controller: ${callUserRemoval.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
