/**
 * Application controller.
 * @module src/business/apis/v1/controllers/application.controller
 */

import { validationResult } from "express-validator";
import {
  applicationCreationAndUniqueIndexRetrievalRules,
  applicationRemovalByIdRules,
  applicationRetrievalByListingIdRules,
  applicationRetrievalByPersonIdRules,
} from "../middleware/application.rules";
import { Request, Response } from "express";
import { appLogger } from "../../../../../logs/logger.config";
import { httpCodes } from "business/codes/responseStatusCodes";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { ServerError } from "errors/serverError.class";
import { UniqueConstraintError } from "errors/uniqueConstraintError.class";
import {
  reqBodyToApplication,
  reqBodyToUniqueIndex,
} from "business/mappers/application.mapper";
import {
  createApplication,
  removeApplicationById,
  retrieveApplicationByUniqueIndex,
  retrieveApplicationsByListingId,
  retrieveApplicationsByPersonId,
} from "service/application.service";
import { applicationControllerResponseMessages } from "business/messages/applicationControllerResponse.message";
import { NotFoundError } from "errors/notFoundError.class";
import { reqBodyToId } from "business/mappers/common.mapper";

/**
 * Middleware array containing logic for application creation.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} applicationCreationAndUniqueIndexRetrievalRules - Express validation rules for application creation.
 * @property {Function} callApplicationCreation - Handles HTTP requests and responses for application creation.
 */
export const applicationCreationMiddlewareArray = [
  ...applicationCreationAndUniqueIndexRetrievalRules(),

  /**
   * Processes HTTP requests for application creation.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callApplicationCreation(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Application controller: ${callApplicationCreation.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const newApplication = reqBodyToApplication(req);
      const savedApplication = await createApplication(newApplication);

      res.status(httpCodes.CREATED).json({
        message: applicationControllerResponseMessages.APPLICATION_CREATED,
        data: savedApplication,
      });
    } catch (error) {
      if (
        error instanceof ServerError ||
        error instanceof UniqueConstraintError
      ) {
        appLogger.error(
          `Application controller: ${callApplicationCreation.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for application retrieval by personId.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} applicationRetrievalByPersonIdRules - Express validation rules for application retrieval by personId.
 * @property {Function} callApplicationRetrievalByPersonId - Handles HTTP requests and responses for application retrieval by personId.
 */
export const retrievalByPersonIdMiddlewareArray = [
  ...applicationRetrievalByPersonIdRules(),

  /**
   * Processes HTTP requests for application retrieval by personId.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callApplicationRetrievalByPersonId(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Application controller: ${callApplicationRetrievalByPersonId.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const personId = reqBodyToId(req);
      const applications = await retrieveApplicationsByPersonId(personId);

      res.status(httpCodes.OK).json({
        message: applicationControllerResponseMessages.APPLICATION_S_RETRIEVED,
        data: applications,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Application controller: ${callApplicationRetrievalByPersonId.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for application retrieval by listingId.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} applicationRetrievalByListingIdRules - Express validation rules for application retrieval by listingId.
 * @property {Function} callApplicationRetrievalByListingId - Handles HTTP requests and responses for application retrieval by listingId.
 */
export const retrievalByListingIdMiddlewareArray = [
  ...applicationRetrievalByListingIdRules(),

  /**
   * Processes HTTP requests for application retrieval by listingId.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callApplicationRetrievalByListingId(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Application controller: ${callApplicationRetrievalByListingId.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const listingId = reqBodyToId(req);
      const applications = await retrieveApplicationsByListingId(listingId);

      res.status(httpCodes.OK).json({
        message: applicationControllerResponseMessages.APPLICATION_S_RETRIEVED,
        data: applications,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Application controller: ${callApplicationRetrievalByListingId.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for application retrieval by unique index.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} applicationCreationAndUniqueIndexRetrievalRules - Express validation rules for application retrieval by unique index.
 * @property {Function} callApplicationRetrievalByUniqueIndex - Handles HTTP requests and responses for application retrieval by unique index.
 */
export const retrievalByUniqueIndexMiddlewareArray = [
  ...applicationCreationAndUniqueIndexRetrievalRules(),

  /**
   * Processes HTTP requests for application retrieval by unique index.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callApplicationRetrievalByUniqueIndex(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Application controller: ${callApplicationRetrievalByUniqueIndex.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { personId, listingId } = reqBodyToUniqueIndex(req);
      const application = await retrieveApplicationByUniqueIndex(
        personId,
        listingId
      );

      res.status(httpCodes.OK).json({
        message: applicationControllerResponseMessages.APPLICATION_RETRIEVED,
        data: application,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Application controller: ${callApplicationRetrievalByUniqueIndex.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for application removal by ID.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} applicationRemovalByIdRules - Express validation rules for application removal by ID.
 * @property {Function} callApplicationRemovalById - Handles HTTP requests and responses for application removal by ID.
 */
export const removalByIdMiddlewareArray = [
  ...applicationRemovalByIdRules(),

  /**
   * Processes HTTP requests for application removal by ID.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callApplicationRemovalById(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Application controller: ${callApplicationRemovalById.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const id = reqBodyToId(req);
      await removeApplicationById(id);

      res.status(httpCodes.NO_CONTENT).json({});
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Application controller: ${callApplicationRemovalById.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
