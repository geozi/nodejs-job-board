/**
 * Listing controller.
 * @module src/business/apis/v1/controllers/listing.controller
 */

import { Request, Response } from "express";
import {
  listingCreationRules,
  listingRetrievalByEmploymentTypeRules,
  listingRetrievalByExperienceLevelRules,
  listingRetrievalByIdRules,
  listingRetrievalByStatusRules,
  listingRetrievalByWorkTypeRules,
  listingUpdateRules,
} from "../middleware/listing.rules";
import { validationResult } from "express-validator";
import { appLogger } from "../../../../../logs/logger.config";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { httpCodes } from "business/codes/responseStatusCodes";
import { ServerError } from "errors/serverError.class";
import {
  reqBodyToEmploymentType,
  reqBodyToExperienceLevel,
  reqBodyToListing,
  reqBodyToListingUpdate,
  reqBodyToStatus,
  reqBodyToWorkType,
} from "business/mappers/listing.mapper";
import {
  bringListingToDate,
  createListing,
  retrieveListingById,
  retrieveListingsByEmploymentType,
  retrieveListingsByExperienceLevel,
  retrieveListingsByStatus,
  retrieveListingsByWorkType,
} from "service/listing.service";
import { listingControllerResponseMessages } from "business/messages/listingControllerResponse.message";
import { NotFoundError } from "errors/notFoundError.class";
import { reqBodyToId } from "business/mappers/common.mapper";

/**
 * Middleware array containing logic for listing creation.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} listingCreationRules - Express validation rules for listing creation.
 * @property {Function} callListingCreation - Handles HTTP requests and responses for listing creation.
 */
export const listingCreationMiddlewareArray = [
  ...listingCreationRules(),

  /**
   * Processes HTTP requests for listing creation.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callListingCreation(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Listing controller: ${callListingCreation.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const newListing = reqBodyToListing(req);
      const savedListing = await createListing(newListing);

      res.status(httpCodes.CREATED).json({
        message: listingControllerResponseMessages.LISTING_CREATED,
        data: savedListing,
      });
    } catch (error) {
      if (error instanceof ServerError) {
        appLogger.error(
          `Listing controller: ${callListingCreation.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for listing update.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} listingUpdateRules - Express validation rules for listing update.
 * @property {Function} callListingUpdate - Handles HTTP requests and responses for listing update.
 */
export const listingUpdateMiddlewareArray = [
  ...listingUpdateRules(),

  /**
   * Processes HTTP requests for listing update.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callListingUpdate(req: Request, res: Response): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Listing controller: ${callListingUpdate.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const listingToUpdate = reqBodyToListingUpdate(req);
      const updatedListing = await bringListingToDate(listingToUpdate);

      res.status(httpCodes.OK).json({
        message: listingControllerResponseMessages.LISTING_UPDATED,
        data: updatedListing,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Listing controller: ${callListingUpdate.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for listing retrieval by status.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} listingRetrievalByStatusRules - Express validation rules for listing retrieval by status.
 * @property {Function} callListingRetrievalByStatus - Handles HTTP requests and responses for listing retrieval by status.
 */
export const retrievalByStatusMiddlewareArray = [
  ...listingRetrievalByStatusRules(),

  /**
   * Processes HTTP requests for listing retrieval by status.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callListingRetrievalByStatus(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Listing controller: ${callListingRetrievalByStatus.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const status = reqBodyToStatus(req);
      const listings = await retrieveListingsByStatus(status);

      res.status(httpCodes.OK).json({
        message: listingControllerResponseMessages.LISTING_S_RETRIEVED,
        data: listings,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Listing controller: ${callListingRetrievalByStatus.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for listing retrieval by work type.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} listingRetrievalByWorkTypeRules - Express validation rules for listing retrieval by work type.
 * @property {Function} callListingRetrievalByWorkType - Handles HTTP requests and responses for listing retrieval by work type.
 */
export const retrievalByWorkTypeMiddlewareArray = [
  ...listingRetrievalByWorkTypeRules(),

  /**
   * Processes HTTP requests for listing retrieval by work type.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callListingRetrievalByWorkType(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Listing controller: ${callListingRetrievalByWorkType.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const workType = reqBodyToWorkType(req);
      const listings = await retrieveListingsByWorkType(workType);

      res.status(httpCodes.OK).json({
        message: listingControllerResponseMessages.LISTING_S_RETRIEVED,
        data: listings,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Listing controller: ${callListingRetrievalByWorkType.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for listing retrieval by employment type.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} listingRetrievalByEmploymentTypeRules - Express validation rules for listing retrieval by employment type.
 * @property {Function} callListingRetrievalByEmploymentType - Handles HTTP requests and responses for listing retrieval by employment type.
 */
export const retrievalByEmploymentTypeMiddlewareArray = [
  ...listingRetrievalByEmploymentTypeRules(),

  /**
   * Processes HTTP requests for listing retrieval by employment type.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callListingRetrievalByEmploymentType(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Listing controller: ${callListingRetrievalByEmploymentType.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const employmentType = reqBodyToEmploymentType(req);
      const listings = await retrieveListingsByEmploymentType(employmentType);

      res.status(httpCodes.OK).json({
        message: listingControllerResponseMessages.LISTING_S_RETRIEVED,
        data: listings,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Listing controller: ${callListingRetrievalByEmploymentType.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for listing retrieval by experience level.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} listingRetrievalByExperienceLevelRules - Express validation rules for listing retrieval by experience level.
 * @property {Function} callListingRetrievalByExperienceLevel - Handles HTTP requests and responses for listing retrieval by experience level.
 */
export const retrievalByExperienceLevelMiddlewareArray = [
  ...listingRetrievalByExperienceLevelRules(),

  /**
   * Processes HTTP requests for listing retrieval by experience level.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callListingRetrievalByExperienceLevel(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Listing controller: ${callListingRetrievalByExperienceLevel.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const experienceLevel = reqBodyToExperienceLevel(req);
      const listings = await retrieveListingsByExperienceLevel(experienceLevel);

      res.status(httpCodes.OK).json({
        message: listingControllerResponseMessages.LISTING_S_RETRIEVED,
        data: listings,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Listing controller: ${callListingRetrievalByExperienceLevel.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

/**
 * Middleware array containing logic for listing retrieval by ID.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} listingRetrievalByIdRules - Express validation rules for listing retrieval by ID.
 * @property {Function} callListingRetrievalById - Handles HTTP requests and responses for listing retrieval by ID.
 */
export const retrievalByIdMiddlewareArray = [
  ...listingRetrievalByIdRules(),

  /**
   * Processes HTTP requests for listing retrieval by ID.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async function callListingRetrievalById(
    req: Request,
    res: Response
  ): Promise<void> {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Listing controller: ${callListingRetrievalById.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const idAsObjectId = reqBodyToId(req);
      const listing = await retrieveListingById(idAsObjectId);

      res.status(httpCodes.OK).json({
        message: listingControllerResponseMessages.LISTING_RETRIEVED,
        data: listing,
      });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `Listing controller: ${callListingRetrievalById.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
