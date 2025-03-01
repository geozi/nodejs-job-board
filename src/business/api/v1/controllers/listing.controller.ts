import { Request, Response } from "express";
import { listingCreationRules } from "../middleware/listing.rules";
import { validationResult } from "express-validator";
import { appLogger } from "../../../../../logs/logger.config";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { ServerError } from "../../../../errors/serverError.class";
import { reqBodyToListing } from "../../../mappers/listing.mapper";
import { createListing } from "../../../../service/listing.service";
import { listingControllerResponseMessages } from "../../../messages/listingControllerResponse.message";

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
