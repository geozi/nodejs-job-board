import { Request, Response } from "express";
import { listingCreationRules } from "../middleware/listing.rules";
import { validationResult } from "express-validator";
import { appLogger } from "../../../../../logs/logger.config";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { httpCodes } from "../../../codes/responseStatusCodes";

export const listingCreationMiddlewareArray = [
  ...listingCreationRules(),
  async function callListingCreation(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Person controller: ${callListingCreation.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }
  },
];
