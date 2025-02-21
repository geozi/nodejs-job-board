import { Listing } from "../domain/models/listing.model";
import { IListing } from "../domain/interfaces/documents/iListing.interface";
import { IListingUpdate } from "../business/interfaces/iListingUpdate.interface";
import { Types } from "mongoose";
import { WorkType } from "../domain/enums/workType.enum";
import { EmploymentType } from "../domain/enums/employmentType.enum";
import { ExperienceLevelType } from "../domain/enums/experienceLevelType.enum";
import { appLogger } from "../../logs/logger.config";

export const getListingsByWorkType = async (
  workType: WorkType
): Promise<Array<IListing>> => {
  const requestedListings = await Listing.find({ workType: workType });

  appLogger.info(
    `Listing repository: ${Listing.find.name} called successfully`
  );

  return requestedListings;
};

export const getListingsByEmploymentType = async (
  employmentType: EmploymentType
): Promise<Array<IListing>> => {
  const requestedListings = await Listing.find({
    employmentType: employmentType,
  });

  appLogger.info(
    `Listing repository: ${Listing.find.name} called successfully`
  );

  return requestedListings;
};

export const getListingsByExperienceLevel = async (
  experienceLevel: ExperienceLevelType
): Promise<Array<IListing>> => {
  const requestedListings = await Listing.find({
    experienceLevel: experienceLevel,
  });

  appLogger.info(
    `Listing repository: ${Listing.find.name} called successfully`
  );

  return requestedListings;
};

export const getListingById = async (
  id: Types.ObjectId
): Promise<IListing | null> => {
  const requestedListing = await Listing.findById(id);

  appLogger.info(`Listing repository: findById called successfully`);

  return requestedListing;
};

export const addListing = async (newListing: IListing): Promise<IListing> => {
  const savedListing = await newListing.save();

  appLogger.info(
    `Listing repository: ${savedListing.save.name} called successfully`
  );

  return savedListing;
};

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
  };

  const updatedListing = await Listing.findByIdAndUpdate(id, listingToUpdate, {
    new: true,
    runValidators: true,
    context: "query",
  });

  appLogger.info(`Listing repository: findByIdAndUpdate called successfully`);

  return updatedListing;
};

export const deleteListing = async (
  id: Types.ObjectId
): Promise<IListing | null> => {
  const deletedListing = await Listing.findByIdAndDelete(id);

  appLogger.info(`Listing repository: findByIdAndDelete called successfully`);

  return deletedListing;
};
