import { Request, Response } from "express";
import {
  listingCreationRules,
  listingRetrievalByEmploymentTypeRules,
  listingRetrievalByStatusRules,
  listingRetrievalByWorkTypeRules,
  listingUpdateRules,
} from "../middleware/listing.rules";
import { validationResult } from "express-validator";
import { appLogger } from "../../../../../logs/logger.config";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { ServerError } from "../../../../errors/serverError.class";
import {
  reqBodyToEmploymentType,
  reqBodyToListing,
  reqBodyToListingUpdate,
  reqBodyToStatus,
  reqBodyToWorkType,
} from "../../../mappers/listing.mapper";
import {
  bringListingToDate,
  createListing,
  retrieveListingsByEmploymentType,
  retrieveListingsByStatus,
  retrieveListingsByWorkType,
} from "../../../../service/listing.service";
import { listingControllerResponseMessages } from "../../../messages/listingControllerResponse.message";
import { NotFoundError } from "../../../../errors/notFoundError.class";

export const listingCreationMiddlewareArray = [
  ...listingCreationRules(),
  async function callListingCreation(req: Request, res: Response) {
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

export const listingUpdateMiddlewareArray = [
  ...listingUpdateRules(),
  async function callListingUpdate(req: Request, res: Response) {
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

export const retrievalByStatusMiddlewareArray = [
  ...listingRetrievalByStatusRules(),
  async function callListingRetrievalByStatus(req: Request, res: Response) {
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

export const retrievalByWorkTypeMiddlewareArray = [
  ...listingRetrievalByWorkTypeRules(),
  async function callListingRetrievalByWorkType(req: Request, res: Response) {
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

export const retrievalByEmploymentTypeMiddlewareArray = [
  ...listingRetrievalByEmploymentTypeRules(),
  async function callListingRetrievalByEmploymentType(
    req: Request,
    res: Response
  ) {
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
