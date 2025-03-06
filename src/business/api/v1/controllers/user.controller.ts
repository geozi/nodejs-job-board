/**
 * User controller.
 * @module src/business/apis/v1/controllers/user.controller
 */
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
import { httpCodes } from "business/codes/responseStatusCodes";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { ServerError } from "errors/serverError.class";
import { UniqueConstraintError } from "errors/uniqueConstraintError.class";
import {
  reqBodyToRole,
  reqBodyToUser,
  reqBodyToUserUpdate,
} from "business/mappers/user.mapper";
import {
  bringUserToDate,
  createUser,
  retrieveUserByEmail,
  retrieveUserByUsername,
  retrieveUsersByRole,
} from "service/user.service";
import { userControllerResponseMessages } from "business/messages/userControllerResponse.message";
import { NotFoundError } from "errors/notFoundError.class";

/**
 * Middleware array that contains user registration logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} userRegistrationRules - Express validation rules for user registration.
 * @property {Function} callUserRegistration - Handles HTTP requests and responses for user registration.
 */
export const registrationMiddlewareArray = [
  ...userRegistrationRules(),

  /**
   * Processes HTTP requests for user registration.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
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

/**
 * Middleware array that contains user update logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} userUpdateRules - Express validation rules for user update.
 * @property {Function} callUserUpdate - Handles HTTP requests and responses for user update.
 */
export const updateMiddlewareArray = [
  ...userUpdateRules(),

  /**
   * Processes HTTP requests for user update.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
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

/**
 * Middleware array that contains user retrieval by username logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} userRetrievalByUsernameRules - Express validation rules for user retrieval by username.
 * @property {Function} callUserRetrievalByUsername - Handles HTTP requests and responses for user retrieval by username.
 */
export const retrievalByUsernameMiddlewareArray = [
  ...userRetrievalByUsernameRules(),

  /**
   * Processes HTTP requests for user retrieval by username.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
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

/**
 * Middleware array that contains user retrieval by email logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} userRetrievalByEmailRules - Express validation rules for user retrieval by email.
 * @property {Function} callUserRetrievalByEmail - Handles HTTP requests and responses for user retrieval by email.
 */
export const retrievalByEmailMiddlewareArray = [
  ...userRetrievalByEmailRules(),

  /**
   * Processes HTTP requests for user retrieval by email.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
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

/**
 * Middleware array that contains user retrieval by role logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} userRetrievalByRoleRules - Express validation rules for user retrieval by role.
 * @property {Function} callUserRetrievalByRole - Handles HTTP requests and responses for user retrieval by role.
 */
export const retrievalByRoleMiddlewareArray = [
  ...userRetrievalByRoleRules(),

  /**
   * Processes HTTP requests for user retrieval by role.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
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
