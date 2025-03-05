import { validationResult } from "express-validator";
import {
  applicationCreationAndUniqueIndexRetrievalRules,
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
  retrieveApplicationByUniqueIndex,
  retrieveApplicationsByListingId,
  retrieveApplicationsByPersonId,
} from "service/application.service";
import { applicationControllerResponseMessages } from "business/messages/applicationControllerResponse.message";
import { NotFoundError } from "errors/notFoundError.class";
import { reqBodyToId } from "business/mappers/common.mapper";

export const applicationCreationMiddlewareArray = [
  ...applicationCreationAndUniqueIndexRetrievalRules(),
  async function callApplicationCreation(req: Request, res: Response) {
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

export const retrievalByPersonIdMiddlewareArray = [
  ...applicationRetrievalByPersonIdRules(),
  async function callApplicationRetrievalByPersonId(
    req: Request,
    res: Response
  ) {
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

export const retrievalByListingIdMiddlewareArray = [
  ...applicationRetrievalByListingIdRules(),
  async function callApplicationRetrievalByListingId(
    req: Request,
    res: Response
  ) {
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

export const retrievalByUniqueIndexMiddlewareArray = [
  ...applicationCreationAndUniqueIndexRetrievalRules(),
  async function callApplicationRetrievalByUniqueIndex(
    req: Request,
    res: Response
  ) {
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
