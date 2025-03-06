/**
 * Person controller.
 * @module src/business/apis/v1/controllers/person.controller
 */

import { Request, Response } from "express";
import {
  personInfoCreationRules,
  personInfoRetrievalByUsernameRules,
  personInfoUpdateRules,
} from "../middleware/person.rules";
import { validationResult } from "express-validator";
import { httpCodes } from "business/codes/responseStatusCodes";
import { appLogger } from "../../../../../logs/logger.config";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { ServerError } from "errors/serverError.class";
import { UniqueConstraintError } from "errors/uniqueConstraintError.class";
import {
  reqBodyToPerson,
  reqBodyToPersonUpdate,
} from "business/mappers/person.mapper";
import { personControllerResponseMessages } from "business/messages/personControllerResponse.message";
import {
  bringPersonInfoToDate,
  createPersonInfo,
  retrievePersonInfoByUsername,
} from "service/person.service";
import { NotFoundError } from "errors/notFoundError.class";

/**
 * Middleware array containing logic for person info creation.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} personInfoCreationRules - Express validation rules for person info creation.
 * @property {Function} callPersonInfoCreation - Handles HTTP requests and responses for person info creation.
 */
export const infoCreationMiddlewareArray = [
  ...personInfoCreationRules(),

  /**
   * Processes HTTP requests for person info creation.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callPersonInfoCreation(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Person controller: ${callPersonInfoCreation.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const newPerson = reqBodyToPerson(req);
      const savedPerson = await createPersonInfo(newPerson);

      res.status(httpCodes.CREATED).json({
        message: personControllerResponseMessages.PERSON_REGISTERED,
        data: savedPerson,
      });
    } catch (error) {
      if (
        error instanceof ServerError ||
        error instanceof UniqueConstraintError
      ) {
        appLogger.error(
          `Person controller: ${callPersonInfoCreation.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for person info update.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} personInfoUpdateRules - Express validation rules for person update creation.
 * @property {Function} callPersonInfoUpdate - Handles HTTP requests and responses for person info update.
 */
export const infoUpdateMiddlewareArray = [
  ...personInfoUpdateRules(),

  /**
   * Processes HTTP requests for person info update.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callPersonInfoUpdate(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Person controller: ${callPersonInfoUpdate.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const userToUpdate = reqBodyToPersonUpdate(req);
      const updatedUser = await bringPersonInfoToDate(userToUpdate);

      res.status(httpCodes.OK).json({
        message: personControllerResponseMessages.PERSON_UPDATED,
        data: updatedUser,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Person controller: ${callPersonInfoUpdate.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for person info retrieval by username.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} personInfoRetrievalByUsernameRules - Express validation rules for person info retrieval by username.
 * @property {Function} callPersonInfoRetrievalByUsername - Handles HTTP requests and responses for person info retrieval by username.
 */
export const infoRetrievalByUsernameMiddlewareArray = [
  ...personInfoRetrievalByUsernameRules(),

  /**
   * Processes HTTP requests for person info retrieval by username.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callPersonInfoRetrievalByUsername(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Person controller: ${callPersonInfoRetrievalByUsername.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { username } = req.body;
      const person = await retrievePersonInfoByUsername(username);

      res.status(httpCodes.OK).json({
        message: personControllerResponseMessages.PERSON_RETRIEVED,
        data: person,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Person controller: ${callPersonInfoRetrievalByUsername.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
