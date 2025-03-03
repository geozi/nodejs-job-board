import { Request } from "express";
import { Listing } from "../../domain/models/listing.model";
import { workTypeMap } from "../../domain/enums/workType.enum";
import { employmentTypeMap } from "../../domain/enums/employmentType.enum";
import { experienceLevelMap } from "../../domain/enums/experienceLevelType.enum";
import { ISalaryRange } from "../../domain/interfaces/secondary/iSalaryRange.interface";
import { ListingStatus } from "../../domain/enums/listingStatus.enum";
import { Types } from "mongoose";
import { IListingUpdate } from "../interfaces/iListingUpdate.interface";
import { IListing } from "../../domain/interfaces/documents/iListing.interface";

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
    datePosted: new Date(datePosted),
    city: city,
    country: country,
    listingDesc: listingDesc,
  };

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

export const reqBodyToStatus = function (req: Request) {
  const { status } = req.body;

  if (status === ListingStatus.Closed.toString()) {
    return ListingStatus.Closed;
  } else {
    return ListingStatus.Open;
  }
};

export const reqBodyToWorkType = function (req: Request) {
  const { workType } = req.body;
  return workTypeMap[workType];
};

export const reqBodyToEmploymentType = function (req: Request) {
  const { employmentType } = req.body;
  return employmentTypeMap[employmentType];
};

export const reqBodyToExperienceLevel = function (req: Request) {
  const { experienceLevel } = req.body;
  return experienceLevelMap[experienceLevel];
};
