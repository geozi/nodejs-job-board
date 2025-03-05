/**
 * Application repository.
 * @module src/persistence/application.repository
 */
import { Application } from "domain/models/application.model";
import { IApplication } from "domain/interfaces/documents/iApplication.interface";
import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";

/**
 * Returns an array of applications with the specified person ID.
 *
 * @param {Types.ObjectId} personId - The ID of a person.
 * @returns {Promise<Array<IApplication>>} A promise that resolves to an array of Application objects or an empty array.
 */
export const getApplicationsByPersonId = async (
  personId: Types.ObjectId
): Promise<Array<IApplication>> => {
  const requestedApplications = await Application.find({
    personId: personId,
  });

  appLogger.info(
    `Application repository: ${getApplicationsByPersonId.name} called successfully`
  );

  return requestedApplications;
};

/**
 * Returns an array of applications with the specified listing ID.
 *
 * @param {Types.ObjectId} listingId - The ID of a listing.
 * @returns {Promise<Array<IApplication>>} A promise that resolves to an array of Application objects or an empty array.
 */
export const getApplicationsByListingId = async (
  listingId: Types.ObjectId
): Promise<Array<IApplication>> => {
  const requestedApplications = await Application.find({
    listingId: listingId,
  });

  appLogger.info(
    `Application repository: ${getApplicationsByListingId.name} called successfully`
  );

  return requestedApplications;
};

/**
 * Returns an application with the specified combination of person and listing IDs.
 *
 * @param {Types.ObjectId} personId - The ID of a person.
 * @param {Types.ObjectId} listingId - The ID of a listing.
 * @returns {Promise<IApplication | null>} - A promise that resolves to an Application object or null.
 */
export const getApplicationByUniqueIndex = async (
  personId: Types.ObjectId,
  listingId: Types.ObjectId
): Promise<IApplication | null> => {
  const foundApplication = await Application.findOne({
    personId: personId,
    listingId: listingId,
  });

  appLogger.info(
    `Application repository: ${getApplicationByUniqueIndex.name} called successfully`
  );

  return foundApplication;
};

/**
 * Adds a new application to database.
 *
 * @param {IApplication} newApplication - The new application to be persisted.
 * @returns {Promise<IApplication>} A promise that resolves to an Application object representing the saved application.
 */
export const addApplication = async (
  newApplication: IApplication
): Promise<IApplication> => {
  const savedApplication = await newApplication.save();

  appLogger.info(
    `Application repository: ${addApplication.name} called successfully`
  );

  return savedApplication;
};

/**
 * Deletes an application with the specified ID.
 *
 * @param {Types.ObjectId} id - The ID of an application.
 * @returns {Promise<IApplication | null>} A promise that resolves to an Application object representing the deleted document or null.
 */
export const deleteApplicationById = async (
  id: Types.ObjectId
): Promise<IApplication | null> => {
  const deletedApplication = await Application.findByIdAndDelete(id);

  appLogger.info(
    `Application repository: ${deleteApplicationById.name} called successfully`
  );

  return deletedApplication;
};

/**
 * Deletes an application with the specified combination of person and listing IDs.
 *
 * @param {Types.ObjectId} personId - The ID of a person.
 * @param {Types.ObjectId} listingId - The ID of a listing.
 * @returns {Promise<IApplication | null>} A promise that resolves to an Application object representing the deleted document or null.
 */
export const deleteApplicationByUniqueIndex = async (
  personId: Types.ObjectId,
  listingId: Types.ObjectId
): Promise<IApplication | null> => {
  const foundApplication = await Application.findOne({
    personId: personId,
    listingId: listingId,
  });

  if (foundApplication) {
    const deletedApplication = await Application.findByIdAndDelete(
      foundApplication._id
    );

    appLogger.info(
      `Application repository: ${deleteApplicationByUniqueIndex.name} called successfully`
    );

    return deletedApplication;
  }

  appLogger.info(
    `Application repository: ${deleteApplicationByUniqueIndex.name} called successfully`
  );

  return foundApplication;
};
