import { Types } from "mongoose";
import { IApplication } from "../domain/interfaces/documents/iApplication.interface";
import { NotFoundError } from "../errors/notFoundError.class";
import { appLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "./messages/commonService.message";
import { ServerError } from "../errors/serverError.class";
import {
  addApplication,
  deleteApplicationById,
  deleteApplicationByUniqueIndex,
  getApplicationByUniqueIndex,
  getApplicationsByListingId,
  getApplicationsByPersonId,
} from "../persistence/application.repository";
import { listingServiceMessages } from "./messages/listingService.message";
import { applicationServiceMessages } from "./messages/applicationService.message";
import { UniqueConstraintError } from "../errors/uniqueConstraintError.class";

export const retrieveApplicationsByPersonId = async (
  personId: Types.ObjectId
): Promise<Array<IApplication>> => {
  try {
    const retrievedApplications = await getApplicationsByPersonId(personId);

    if (retrievedApplications.length === 0) {
      throw new NotFoundError(listingServiceMessages.LISTINGS_NOT_FOUND);
    }

    return retrievedApplications;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Application service: ${retrieveApplicationsByPersonId.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Application service: ${retrieveApplicationsByPersonId.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const retrieveApplicationsByListingId = async (
  listingId: Types.ObjectId
): Promise<Array<IApplication>> => {
  try {
    const retrievedApplications = await getApplicationsByListingId(listingId);

    if (retrievedApplications.length === 0) {
      throw new NotFoundError(
        applicationServiceMessages.APPLICATIONS_NOT_FOUND
      );
    }

    return retrievedApplications;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Application service: ${retrieveApplicationsByListingId.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Application service: ${retrieveApplicationsByListingId.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const retrieveApplicationByUniqueIndex = async (
  personId: Types.ObjectId,
  listingId: Types.ObjectId
): Promise<IApplication> => {
  try {
    const retrievedApplication = await getApplicationByUniqueIndex(
      personId,
      listingId
    );

    if (retrievedApplication === null) {
      throw new NotFoundError(applicationServiceMessages.APPLICATION_NOT_FOUND);
    }

    return retrievedApplication;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Application service: ${retrieveApplicationByUniqueIndex.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Application service: ${retrieveApplicationByUniqueIndex.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const createApplication = async (
  newApplication: IApplication
): Promise<IApplication> => {
  try {
    return await addApplication(newApplication);
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Application service: ${createApplication.name} -> ${error.name} detected and re-thrown`
      );

      throw new UniqueConstraintError(error.message);
    }

    appLogger.error(
      `Application service: ${createApplication.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const removeApplicationById = async (
  id: Types.ObjectId
): Promise<IApplication | null> => {
  try {
    const removedApplication = await deleteApplicationById(id);

    if (removedApplication === null) {
      throw new NotFoundError(applicationServiceMessages.APPLICATION_NOT_FOUND);
    }

    return removedApplication;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Application service: ${removeApplicationById.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Application service: ${removeApplicationById.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const removeApplicationByUniqueIndex = async (
  personId: Types.ObjectId,
  listingId: Types.ObjectId
): Promise<IApplication | null> => {
  try {
    const removedApplication = await deleteApplicationByUniqueIndex(
      personId,
      listingId
    );

    if (removedApplication === null) {
      throw new NotFoundError(applicationServiceMessages.APPLICATION_NOT_FOUND);
    }

    return removedApplication;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Application service: ${removeApplicationByUniqueIndex.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Application service: ${removeApplicationByUniqueIndex.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
