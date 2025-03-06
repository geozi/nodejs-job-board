/**
 * Application service.
 * @module src/service/application.service
 */
import { Error, Types } from "mongoose";
import { IApplication } from "domain/interfaces/documents/iApplication.interface";
import { NotFoundError } from "errors/notFoundError.class";
import { appLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "./messages/commonService.message";
import { ServerError } from "errors/serverError.class";
import {
  addApplication,
  deleteApplicationById,
  getApplicationByUniqueIndex,
  getApplicationsByListingId,
  getApplicationsByPersonId,
} from "persistence/application.repository";
import { applicationServiceMessages } from "./messages/applicationService.message";
import { UniqueConstraintError } from "errors/uniqueConstraintError.class";

/**
 * Calls on the persistence layer to retrieve applications with the specified person ID.
 *
 * @param {Types.ObjectId} personId - The ID assigned to a person.
 * @returns {Promise<Array<IApplication>>} A promise that resolves to an array of IApplication objects.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const retrieveApplicationsByPersonId = async (
  personId: Types.ObjectId
): Promise<Array<IApplication>> => {
  try {
    const retrievedApplications = await getApplicationsByPersonId(personId);

    if (retrievedApplications.length === 0) {
      throw new NotFoundError(
        applicationServiceMessages.APPLICATIONS_NOT_FOUND
      );
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

/**
 * Calls on the persistence layer to retrieve applications with the specified listing ID.
 *
 * @param {Types.ObjectId} listingId - The ID assigned to a listing.
 * @returns {Promise<Array<IApplication>>} A promise that resolves to an array of IApplication objects.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
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

/**
 * Calls on the persistence layer to retrieve an application with the specified combination of person and listing IDs.
 *
 * @param {Types.ObjectId} personId - The ID assigned to a person.
 * @param {Types.ObjectId} listingId - The ID assigned to a listing.
 * @returns {Promise<IApplication>} A promise that resolves to an IApplication object.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
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

/**
 * Calls on the persistence layer to add a new application to database.
 *
 * @param {IApplication} newApplication - The new application to be persisted.
 * @returns {Promise<IApplication>} A promise that resolves to an IApplication object representing the newly persisted application.
 * @throws - {@link UniqueConstraintError} | {@link ServerError}
 */
export const createApplication = async (
  newApplication: IApplication
): Promise<IApplication> => {
  try {
    return await addApplication(newApplication);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
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

/**
 * Calls on the persistence layer to remove an application with the specified ID.
 *
 * @param {Types.ObjectId} id - The ID assigned to an application.
 * @returns {Promise<IApplication>} A promise that resolves to an IApplication object representing the removed application.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const removeApplicationById = async (
  id: Types.ObjectId
): Promise<IApplication> => {
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
