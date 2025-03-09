/**
 * Listing repository.
 * @module src/persistence/listing.repository
 */
import { Listing } from "domain/models/listing.model";
import { IListing } from "domain/interfaces/documents/iListing.interface";
import { IListingUpdate } from "business/interfaces/iListingUpdate.interface";
import { Types } from "mongoose";
import { WorkType } from "domain/enums/workType.enum";
import { EmploymentType } from "domain/enums/employmentType.enum";
import { ExperienceLevelType } from "domain/enums/experienceLevelType.enum";
import { appLogger } from "../../logs/logger.config";
import { ListingStatus } from "domain/enums/listingStatus.enum";

/**
 * Returns an array of listings with the specified status.
 *
 * @param {ListingStatus} status - The status assigned to listings.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of {@link IListing} objects or an empty array.
 */
export const getListingsByStatus = async (
  status: ListingStatus
): Promise<Array<IListing>> => {
  const requestedListings = await Listing.find({ status: status });

  appLogger.info(
    `Listing repository: ${getListingsByStatus.name} called successfully`
  );

  return requestedListings;
};

/**
 * Returns an array of listings with the specified work type.
 *
 * @param {WorkType} workType - A work type category.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of {@link IListing} objects or an empty array.
 */
export const getListingsByWorkType = async (
  workType: WorkType
): Promise<Array<IListing>> => {
  const requestedListings = await Listing.find({ workType: workType });

  appLogger.info(
    `Listing repository: ${getListingsByWorkType.name} called successfully`
  );

  return requestedListings;
};

/**
 * Returns an array of listings with the specified employment type.
 *
 * @param {EmploymentType} employmentType - An employment type category.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of {@link IListing} objects or an empty array.
 */
export const getListingsByEmploymentType = async (
  employmentType: EmploymentType
): Promise<Array<IListing>> => {
  const requestedListings = await Listing.find({
    employmentType: employmentType,
  });

  appLogger.info(
    `Listing repository: ${getListingsByEmploymentType.name} called successfully`
  );

  return requestedListings;
};

/**
 * Returns an array of listings with the specified experience level.
 *
 * @param {ExperienceLevelType} experienceLevel - An experience level category.
 * @returns {Promise<Array<IListing>>} A promise that resolves to an array of {@link IListing} objects or an empty array.
 */
export const getListingsByExperienceLevel = async (
  experienceLevel: ExperienceLevelType
): Promise<Array<IListing>> => {
  const requestedListings = await Listing.find({
    experienceLevel: experienceLevel,
  });

  appLogger.info(
    `Listing repository: ${getListingsByExperienceLevel.name} called successfully`
  );

  return requestedListings;
};

/**
 * Returns a listing with the specified ID.
 *
 * @param {Types.ObjectId} id - The ID of a listing.
 * @returns {Promise<IListing | null>} A promise that resolves to a {@link IListing} object or null.
 */
export const getListingById = async (
  id: Types.ObjectId
): Promise<IListing | null> => {
  const requestedListing = await Listing.findById(id);

  appLogger.info(
    `Listing repository: ${getListingById.name} called successfully`
  );

  return requestedListing;
};

/**
 * Adds a new listing to database.
 *
 * @param {IListing} newListing - The new listing to be persisted.
 * @returns {Promise<IListing>} A promise that resolves to a {@link IListing} object.
 */
export const addListing = async (newListing: IListing): Promise<IListing> => {
  const savedListing = await newListing.save();

  appLogger.info(`Listing repository: ${addListing.name} called successfully`);

  return savedListing;
};

/**
 * Updates the information of an existing listing in the database.
 *
 * @param {IListingUpdate} updateDataObj - The new information to be persisted.
 * @returns {Promise<IListing | null>} A promise that resolves to a {@link IListing} object representing the updated document or null.
 */
export const updateListing = async (
  updateDataObj: IListingUpdate
): Promise<IListing | null> => {
  const {
    id,
    title,
    organizationName,
    datePosted,
    workType,
    employmentType,
    experienceLevel,
    city,
    country,
    listingDesc,
    salaryRange,
    status,
  } = { ...updateDataObj };

  const listingToUpdate = {
    title: title,
    organizationName: organizationName,
    datePosted: datePosted,
    workType: workType,
    employmentType: employmentType,
    experienceLevel: experienceLevel,
    city: city,
    country: country,
    listingDesc: listingDesc,
    salaryRange: salaryRange,
    status: status,
  };

  const updatedListing = await Listing.findByIdAndUpdate(id, listingToUpdate, {
    new: true,
    runValidators: true,
    context: "query",
  });

  appLogger.info(
    `Listing repository: ${updateListing.name} called successfully`
  );

  return updatedListing;
};

/**
 * Deletes a listing.
 *
 * @param {Types.ObjectId} id The ID of a listing.
 * @returns {Promise<IListing | null>} A promise that resolves to a {@link IListing} object representing the deleted document or null.
 */
export const deleteListing = async (
  id: Types.ObjectId
): Promise<IListing | null> => {
  const deletedListing = await Listing.findByIdAndDelete(id);

  appLogger.info(
    `Listing repository: ${deleteListing.name} called successfully`
  );

  return deletedListing;
};
