/**
 * Auth controller.
 * @module src/auth/auth.controller
 */
import { appLogger } from "../../logs/logger.config";
import { userLoginRules } from "./auth.rules";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { httpCodes } from "business/codes/responseStatusCodes";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { NotFoundError } from "errors/notFoundError.class";
import { authResponseMessages } from "./authResponse.message";
import { ServerError } from "errors/serverError.class";
import { retrieveUserByUsername } from "service/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Middleware array containing logic for user login.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} userLoginRules - Express validation rules for user login.
 * @property {Function} loginUser - Handles HTTP requests and responses for user login.
 */
export const userLoginMiddlewareArray = [
  ...userLoginRules(),

  /**
   * Processes HTTP requests for user login.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function loginUser(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Auth controller: ${loginUser.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { username, password } = req.body;
      const user = await retrieveUserByUsername(username);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res
          .status(httpCodes.UNAUTHORIZED)
          .json({ message: authResponseMessages.AUTHENTICATION_FAILED });
        return;
      }

      const token = jwt.sign(
        { loggedInUser: user.username },
        process.env.USER_KEY as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(httpCodes.OK).json({
        message: authResponseMessages.AUTHENTICATION_SUCCESS,
        token: token,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        appLogger.error(
          `Auth controller: loginUser() -> ${error.name} detected and caught`
        );

        res
          .status(httpCodes.UNAUTHORIZED)
          .json({ message: authResponseMessages.AUTHENTICATION_FAILED });
        return;
      }

      if (error instanceof ServerError) {
        appLogger.error(
          `Auth controller: loginUser() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
