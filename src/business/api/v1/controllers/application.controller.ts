import { validationResult } from "express-validator";
import { applicationCreationRules } from "../middleware/application.rules";
import { Request, Response } from "express";
import { appLogger } from "../../../../../logs/logger.config";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraintError.class";
import { reqBodyToApplication } from "../../../mappers/application.mapper";
import { createApplication } from "../../../../service/application.service";
import { applicationControllerResponseMessages } from "../../../messages/applicationControllerResponse.message";

export const applicationCreationMiddlewareArray = [
  ...applicationCreationRules(),
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

      res
        .status(httpCodes.CREATED)
        .json({
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
