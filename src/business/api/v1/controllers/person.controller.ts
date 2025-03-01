import { Request, Response } from "express";
import {
  personInfoCreationRules,
  personInfoUpdateRules,
} from "../middleware/person.rules";
import { validationResult } from "express-validator";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { appLogger } from "../../../../../logs/logger.config";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraintError.class";
import {
  reqBodyToPerson,
  reqBodyToPersonUpdate,
} from "../../../mappers/person.mapper";
import { personControllerResponseMessages } from "../../../messages/personControllerResponse.message";
import {
  bringPersonInfoToDate,
  createPersonInfo,
} from "../../../../service/person.service";
import { NotFoundError } from "../../../../errors/notFoundError.class";

export const infoCreationMiddlewareArray = [
  ...personInfoCreationRules(),
  async function callPersonInfoCreation(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callPersonInfoCreation.name} -> Express validation errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }
    const newPerson = reqBodyToPerson(req);
    const savedPerson = await createPersonInfo(newPerson);

    res.status(httpCodes.CREATED).json({
      message: personControllerResponseMessages.PERSON_REGISTERED,
      data: savedPerson,
    });
    try {
    } catch (error) {
      if (
        error instanceof ServerError ||
        error instanceof UniqueConstraintError
      ) {
        appLogger.error(
          `User controller: ${callPersonInfoCreation.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const infoUpdateMiddlewareArray = [
  ...personInfoUpdateRules(),
  async function callPersonInfoUpdate(req: Request, res: Response) {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: ${callPersonInfoUpdate.name} -> Express validation errors detected and caught`
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

      res
        .status(httpCodes.OK)
        .json({
          message: personControllerResponseMessages.PERSON_UPDATED,
          data: updatedUser,
        });
    } catch (error) {
      if (error instanceof ServerError || error instanceof NotFoundError) {
        appLogger.error(
          `User controller: ${callPersonInfoUpdate.name} -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
