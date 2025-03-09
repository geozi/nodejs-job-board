/**
 * Listing mapper.
 * @module src/business/mappers/listing.mapper
 */

import { Request } from "express";
import { Listing } from "../../domain/models/listing.model";
import { WorkType, workTypeMap } from "../../domain/enums/workType.enum";
import {
  EmploymentType,
  employmentTypeMap,
} from "../../domain/enums/employmentType.enum";
import {
  experienceLevelMap,
  ExperienceLevelType,
} from "../../domain/enums/experienceLevelType.enum";
import { ISalaryRange } from "../../domain/interfaces/secondary/iSalaryRange.interface";
import { ListingStatus } from "../../domain/enums/listingStatus.enum";
import { Types } from "mongoose";
import { IListingUpdate } from "../interfaces/iListingUpdate.interface";
import { IListing } from "../../domain/interfaces/documents/iListing.interface";

/**
 * Maps an HTTP request body to an {@link IListing} object.
 *
 * @param {Request} req - An HTTP request.
 * @returns {IListing} An {@link IListing} object.
 */
export const reqBodyToListing = function (req: Request): IListing {
  const {
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
  } = req.body;

  const listing = new Listing({
    title: title,
    organizationName: organizationName,
    datePosted: new Date(datePosted),
    city: city,
    country: country,
    listingDesc: listingDesc,
  });

  listing.workType = workTypeMap[workType];
  listing.employmentType = employmentTypeMap[employmentType];
  listing.experienceLevel = experienceLevelMap[experienceLevel];

  if (salaryRange) {
    const { minAmount, maxAmount } = salaryRange;
    const checkedSalaryRange: ISalaryRange = {
      minAmount: minAmount,
      maxAmount: maxAmount,
    };

    listing.salaryRange = checkedSalaryRange;
  }

  switch (status) {
    case ListingStatus.Closed.toString():
      listing.status = ListingStatus.Closed;
      break;
    case ListingStatus.Open.toString():
      listing.status = ListingStatus.Open;
      break;
  }

  return listing;
};

/**
 * Maps an HTTP request body to an {@link IListingUpdate} object.
 *
 * @param {Request} req - An HTTP request.
 * @returns {IListingUpdate} - An {@link IListingUpdate} object.
 */
export const reqBodyToListingUpdate = function (req: Request): IListingUpdate {
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
  } = req.body;

  const listingToUpdate: IListingUpdate = {
    id: new Types.ObjectId(id),
    title: title,
    organizationName: organizationName,
    city: city,
    country: country,
    listingDesc: listingDesc,
  };

  if (datePosted) {
    listingToUpdate.datePosted = new Date(datePosted);
  }

  listingToUpdate.workType = workTypeMap[workType];
  listingToUpdate.employmentType = employmentTypeMap[employmentType];
  listingToUpdate.experienceLevel = experienceLevelMap[experienceLevel];

  if (salaryRange) {
    const { minAmount, maxAmount } = salaryRange;
    const checkedSalaryRange: ISalaryRange = {
      minAmount: minAmount,
      maxAmount: maxAmount,
    };

    listingToUpdate.salaryRange = checkedSalaryRange;
  }

  switch (status) {
    case ListingStatus.Closed.toString():
      listingToUpdate.status = ListingStatus.Closed;
      break;
    case ListingStatus.Open.toString():
      listingToUpdate.status = ListingStatus.Open;
      break;
  }

  return listingToUpdate;
};

/**
 * Maps an HTTP request body to a {@link ListingStatus} enum.
 *
 * @param {Request} req - An HTTP request.
 * @returns {ListingStatus} A {@link ListingStatus} enum.
 */
export const reqBodyToStatus = function (req: Request): ListingStatus {
  const { status } = req.body;

  if (status === ListingStatus.Closed.toString()) {
    return ListingStatus.Closed;
  } else {
    return ListingStatus.Open;
  }
};

/**
 * Maps an HTTP request body to a {@link WorkType} enum.
 *
 * @param {Request} req - An HTTP request.
 * @returns {WorkType} A {@link WorkType} enum.
 */
export const reqBodyToWorkType = function (req: Request): WorkType {
  const { workType } = req.body;
  return workTypeMap[workType];
};

/**
 * Maps an HTTP request body to an {@link EmploymentType} enum.
 *
 * @param {Request} req - An HTTP request.
 * @returns {EmploymentType} An {@link EmploymentType} enum.
 */
export const reqBodyToEmploymentType = function (req: Request): EmploymentType {
  const { employmentType } = req.body;
  return employmentTypeMap[employmentType];
};

/**
 * Maps an HTTP request body to an {@link ExperienceLevelType} enum.
 *
 * @param {Request} req - An HTTP request.
 * @returns {ExperienceLevelType} An {@link ExperienceLevelType} enum.
 */
export const reqBodyToExperienceLevel = function (
  req: Request
): ExperienceLevelType {
  const { experienceLevel } = req.body;
  return experienceLevelMap[experienceLevel];
};

/**
 * Maps an HTTP request body to a listing ID.
 *
 * @param {Request} req - An HTTP request.
 * @returns {Types.ObjectId} An ID of Types.ObjectId.
 * @see {@link https://mongoosejs.com/docs/schematypes.html#objectids}
 */
export const reqBodyToListingId = function (req: Request): Types.ObjectId {
  const { listingId } = req.body;
  return new Types.ObjectId(listingId);
};
