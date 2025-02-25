/**
 * Listing service.
 * @module src/service/listing.service
 */
import { Error, Types } from "mongoose";
import { EmploymentType } from "../domain/enums/employmentType.enum";
import { ExperienceLevelType } from "../domain/enums/experienceLevelType.enum";
import { ListingStatus } from "../domain/enums/listingStatus.enum";
import { WorkType } from "../domain/enums/workType.enum";
import { IListing } from "../domain/interfaces/documents/iListing.interface";
import { IListingUpdate } from "../business/interfaces/iListingUpdate.interface";
import { NotFoundError } from "../errors/notFoundError.class";
import { appLogger } from "../../logs/logger.config";
import { ServerError } from "../errors/serverError.class";
import { commonServiceMessages } from "./messages/commonService.message";
import {
  addListing,
  deleteListing,
  getListingById,
  getListingsByEmploymentType,
  getListingsByExperienceLevel,
  getListingsByStatus,
  getListingsByWorkType,
  updateListing,
} from "../persistence/listing.repository";
import { listingServiceMessages } from "./messages/listingService.message";
import { UniqueConstraintError } from "../errors/uniqueConstraintError.class";

/**
 * Calls on the persistence layer to retrieve the listings with the specified status.
 *
 * @param {ListingStatus} status - An enum representing the status assigned to listings.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of IListing objects.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveListingsByStatus = async (
  status: ListingStatus
): Promise<Array<IListing>> => {
  try {
    const retrievedListings = await getListingsByStatus(status);
    if (retrievedListings.length === 0) {
      throw new NotFoundError(listingServiceMessages.LISTINGS_NOT_FOUND);
    }
    return retrievedListings;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Listing service: ${retrieveListingsByStatus.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Listing service: ${retrieveListingsByStatus.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the listings with the specified work type.
 *
 * @param {WorkType} workType - An enum representing the work type assigned to listings.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of IListing objects.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveListingsByWorkType = async (
  workType: WorkType
): Promise<Array<IListing>> => {
  try {
    const retrievedListings = await getListingsByWorkType(workType);

    if (retrievedListings.length === 0) {
      throw new NotFoundError(listingServiceMessages.LISTINGS_NOT_FOUND);
    }

    return retrievedListings;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Listing service: ${retrieveListingsByWorkType.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Listing service: ${retrieveListingsByWorkType.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the listings with the specified employment type.
 *
 * @param {EmploymentType} employmentType - An enum representing the employment type assigned to listings.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of IListing objects.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveListingsByEmploymentType = async (
  employmentType: EmploymentType
): Promise<Array<IListing>> => {
  try {
    const retrievedListings = await getListingsByEmploymentType(employmentType);

    if (retrievedListings.length === 0) {
      throw new NotFoundError(listingServiceMessages.LISTINGS_NOT_FOUND);
    }

    return retrievedListings;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Listing service: ${retrieveListingsByEmploymentType.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Listing service: ${retrieveListingsByEmploymentType.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the listings with the specified experience level.
 *
 * @param {ExperienceLevelType} experienceLevel - An enum representing the experience level assigned to listings.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of IListing objects.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveListingsByExperienceLevel = async (
  experienceLevel: ExperienceLevelType
): Promise<Array<IListing>> => {
  try {
    const retrievedListings = await getListingsByExperienceLevel(
      experienceLevel
    );

    if (retrievedListings.length === 0) {
      throw new NotFoundError(listingServiceMessages.LISTINGS_NOT_FOUND);
    }

    return retrievedListings;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Listing service: ${retrieveListingsByExperienceLevel.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Listing service: ${retrieveListingsByExperienceLevel.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the listing with the specified ID.
 *
 * @param {Types.ObjectId} id - The ID assigned to the listing.
 * @returns {Promise<IListing>} A promise that resolves to an IListing object.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveListingById = async (
  id: Types.ObjectId
): Promise<IListing> => {
  try {
    const retrievedListing = await getListingById(id);

    if (retrievedListing === null) {
      throw new NotFoundError(listingServiceMessages.LISTING_NOT_FOUND);
    }

    return retrievedListing;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Listing service: ${retrieveListingById.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Listing service: ${retrieveListingById.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to create a new listing in the database.
 *
 * @param {IListing} newListing - The new listing to be persisted.
 * @returns {Promise<IListing>} A promise that resolves to an IListing object representing the newly created listing.
 * @throws {UniqueConstraintError | ServerError}
 */
export const createListing = async (
  newListing: IListing
): Promise<IListing> => {
  try {
    return await addListing(newListing);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      appLogger.error(
        `Listing service: ${createListing.name} -> ${error.name} detected and re-thrown`
      );

      throw new UniqueConstraintError(error.message);
    }

    appLogger.error(
      `Listing service: ${createListing.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update an existing listing in the database.
 *
 * @param {IListingUpdate} updateDataObj - The new information to be persisted.
 * @returns {Promise<IListing>} A listing that resolves to an IListing object representing the updated listing.
 * @throws {NotFoundError | ServerError}
 */
export const bringListingToDate = async (
  updateDataObj: IListingUpdate
): Promise<IListing> => {
  try {
    const updatedListing = await updateListing(updateDataObj);

    if (updatedListing === null) {
      throw new NotFoundError(listingServiceMessages.LISTING_NOT_FOUND);
    }
    return updatedListing;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Listing service: ${bringListingToDate.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Listing service: ${bringListingToDate.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to remove a listing from the database.
 *
 * @param {Types.ObjectId} id - The ID assigned to a listing.
 * @returns {Promise<IListing>} A promise that resolves to an IListing object representing the removed listing.
 * @throws {NotFoundError | ServerError}
 */
export const removeListing = async (id: Types.ObjectId): Promise<IListing> => {
  try {
    const removedListing = await deleteListing(id);
    if (removedListing === null) {
      throw new NotFoundError(listingServiceMessages.LISTING_NOT_FOUND);
    }
    return removedListing;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Listing service: ${removeListing.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Listing service: ${removeListing.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
