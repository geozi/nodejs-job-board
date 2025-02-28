import { Request, Response } from "express";
import {
  userRegistrationRules,
  userRetrievalByEmailRules,
  userRetrievalByRoleRules,
  userRetrievalByUsernameRules,
  userUpdateRules,
} from "../middleware/user.rules";
import { validationResult } from "express-validator";
import { appLogger } from "../../../../../logs/logger.config";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraintError.class";
import {
  reqBodyToRole,
  reqBodyToUser,
  reqBodyToUserUpdate,
} from "../../../mappers/user.mapper";
import {
  bringUserToDate,
  createUser,
  retrieveUserByEmail,
  retrieveUserByUsername,
  retrieveUsersByRole,
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

export const retrievalByUsernameMiddlewareArray = [
  ...userRetrievalByUsernameRules(),
  async function callUserRetrievalByUsername(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callUserRetrievalByUsername.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { username } = req.body;
      const user = await retrieveUserByUsername(username);

      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_RETRIEVED,
        data: user,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `User controller: ${callUserRetrievalByUsername.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const retrievalByEmailMiddlewareArray = [
  ...userRetrievalByEmailRules(),
  async function callUserRetrievalByEmail(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callUserRetrievalByEmail.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { email } = req.body;
      const user = await retrieveUserByEmail(email);

      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_RETRIEVED,
        data: user,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `User controller: ${callUserRetrievalByEmail.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const retrievalByRoleMiddlewareArray = [
  ...userRetrievalByRoleRules(),
  async function callUserRetrievalByRole(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callUserRetrievalByRole.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const role = reqBodyToRole(req);
      const users = await retrieveUsersByRole(role);

      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_S_RETRIEVED,
        data: users,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `User controller: ${callUserRetrievalByRole.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
