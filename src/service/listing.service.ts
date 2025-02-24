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

export const retrieveListingById = async (
  id: Types.ObjectId
): Promise<IListing | null> => {
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

export const bringListingToDate = async (
  updateDataObj: IListingUpdate
): Promise<IListing | null> => {
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

export const removeListing = async (
  id: Types.ObjectId
): Promise<IListing | null> => {
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
