import { Request } from "express";
import { Listing } from "../../domain/models/listing.model";
import { WorkType } from "../../domain/enums/workType.enum";
import { EmploymentType } from "../../domain/enums/employmentType.enum";
import { ExperienceLevelType } from "../../domain/enums/experienceLevelType.enum";
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

  const workTypeMap: { [key: string]: WorkType } = {
    [WorkType.Hybrid.toString()]: WorkType.Hybrid,
    [WorkType.On_Site.toString()]: WorkType.On_Site,
    [WorkType.Remote.toString()]: WorkType.Remote,
  };

  listing.workType = workTypeMap[workType];

  const employmentTypeMap: { [key: string]: EmploymentType } = {
    [EmploymentType.Contract.toString()]: EmploymentType.Contract,
    [EmploymentType.Full_Time.toString()]: EmploymentType.Full_Time,
    [EmploymentType.Part_Time.toString()]: EmploymentType.Part_Time,
    [EmploymentType.Temporary.toString()]: EmploymentType.Temporary,
    [EmploymentType.Other.toString()]: EmploymentType.Other,
  };

  listing.employmentType = employmentTypeMap[employmentType];

  const experienceLevelMap: { [key: string]: ExperienceLevelType } = {
    [ExperienceLevelType.Internship.toString()]: ExperienceLevelType.Internship,
    [ExperienceLevelType.Entry_Level.toString()]:
      ExperienceLevelType.Entry_Level,
    [ExperienceLevelType.Mid_Senior_Level.toString()]:
      ExperienceLevelType.Mid_Senior_Level,
    [ExperienceLevelType.Associate.toString()]: ExperienceLevelType.Associate,
    [ExperienceLevelType.Director.toString()]: ExperienceLevelType.Director,
    [ExperienceLevelType.Executive.toString()]: ExperienceLevelType.Executive,
  };

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

  const workTypeMap: { [key: string]: WorkType } = {
    [WorkType.Hybrid.toString()]: WorkType.Hybrid,
    [WorkType.On_Site.toString()]: WorkType.On_Site,
    [WorkType.Remote.toString()]: WorkType.Remote,
  };

  listingToUpdate.workType = workTypeMap[workType];

  const employmentTypeMap: { [key: string]: EmploymentType } = {
    [EmploymentType.Contract.toString()]: EmploymentType.Contract,
    [EmploymentType.Full_Time.toString()]: EmploymentType.Full_Time,
    [EmploymentType.Part_Time.toString()]: EmploymentType.Part_Time,
    [EmploymentType.Temporary.toString()]: EmploymentType.Temporary,
    [EmploymentType.Other.toString()]: EmploymentType.Other,
  };

  listingToUpdate.employmentType = employmentTypeMap[employmentType];

  const experienceLevelMap: { [key: string]: ExperienceLevelType } = {
    [ExperienceLevelType.Internship.toString()]: ExperienceLevelType.Internship,
    [ExperienceLevelType.Entry_Level.toString()]:
      ExperienceLevelType.Entry_Level,
    [ExperienceLevelType.Mid_Senior_Level.toString()]:
      ExperienceLevelType.Mid_Senior_Level,
    [ExperienceLevelType.Associate.toString()]: ExperienceLevelType.Associate,
    [ExperienceLevelType.Director.toString()]: ExperienceLevelType.Director,
    [ExperienceLevelType.Executive.toString()]: ExperienceLevelType.Executive,
  };

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
