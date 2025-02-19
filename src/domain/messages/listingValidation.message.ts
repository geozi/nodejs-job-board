import { commonConstants } from "../constants/common.constant";
import { listingConstants } from "../constants/listing.constant";
import { EmploymentType } from "../enums/employmentType.enum";
import { ExperienceLevelType } from "../enums/experienceLevelType.enum";
import { WorkType } from "../enums/workType.enum";

export const listingFailedValidation = {
  TITLE_REQUIRED_MESSAGE: "Title is a required field",
  DATE_POSTED_REQUIRED_MESSAGE: "Date posted is a required field",
  DATE_POSTED_INVALID_MESSAGE: "Date posted must be a valid date",
  WORK_TYPE_REQUIRED_MESSAGE: "Work type is required field",
  WORK_TYPE_INVALID_MESSAGE: `Work type must be one of the following: ${WorkType.Hybrid}, ${WorkType.On_Site}, ${WorkType.Remote}`,
  EMPLOYMENT_TYPE_REQUIRED_MESSAGE: "Employment type is a required field",
  EMPLOYMENT_TYPE_INVALID_MESSAGE: `Employment type must be one of the following: ${EmploymentType.Contract}, ${EmploymentType.Full_Time}, ${EmploymentType.Part_Time}, ${EmploymentType.Temporary}, ${EmploymentType.Other}`,
  EXPERIENCE_LEVEL_REQUIRED_MESSAGE: "Experience level is a required message",
  EXPERIENCE_LEVEL_INVALID_MESSAGE: `Experience level must be one of the following: ${ExperienceLevelType.Internship}, ${ExperienceLevelType.Entry_Level}, ${ExperienceLevelType.Mid_Senior_Level}, ${ExperienceLevelType.Associate}, ${ExperienceLevelType.Director}, ${ExperienceLevelType.Executive}`,
  CITY_REQUIRED_MESSAGE: "City is a required field",
  COUNTRY_REQUIRED_MESSAGE: "Country is a required field",
  LISTING_DESCRIPTION_REQUIRED_MESSAGE: `Listing description is a required message`,
  LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE: `Listing description must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,
  LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE: `Listing description must be no longer than ${listingConstants.LISTING_DESCRIPTION_MAX_LENGTH} characters`,
  LISTING_ID_REQUIRED_MESSAGE: "Listing ID is a required field",
  LISTING_ID_INVALID_MESSAGE: "Listing ID must be a string of hex characters",
  LISTING_ID_OUT_OF_LENGTH_MESSAGE: `Listing ID must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
};
