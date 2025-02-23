/**
 * Listing model schema.
 * @module src/domain/models/listing.model
 */
import { Schema, model } from "mongoose";
import { IListing } from "../interfaces/documents/iListing.interface";
import { listingConstants } from "../constants/listing.constant";
import { listingFailedValidation } from "../messages/listingValidation.message";
import { commonConstants } from "../constants/common.constant";
import { commonFailedValidation } from "../messages/commonValidation.message";
import { WorkType } from "../enums/workType.enum";
import { EmploymentType } from "../enums/employmentType.enum";
import { ExperienceLevelType } from "../enums/experienceLevelType.enum";
import { COUNTRY_REGEX } from "../resources/validationRegExp";
import { ListingStatus } from "../enums/listingStatus.enum";

/**
 * Listing schema for persistence in MongoDB.
 *
 * @type {Schema<IListing>}
 * @property {string} title - The title of the job listing.
 * @property {string} organizationName - The name of the hiring organization.
 * @property {Date} datePosted - The date when the job listing was posted.
 * @property {string} workType - The work type of the job.
 * @property {string} employmentType - The employment type of the job.
 * @property {string} experienceLevel - The experience level required by the hiring organization.
 * @property {string} city - The city where the job is located.
 * @property {string} country - The country where the job is located.
 * @property {string} listingDesc - The description of the job.
 * @property {Schema.Types.Mixed[]} [salaryRange] - (Optional) The salary range of the job.
 * @property {string} status - The status of the listing.
 */
const listingSchema = new Schema<IListing>({
  title: {
    type: String,
    required: [true, listingFailedValidation.TITLE_REQUIRED_MESSAGE],
    trim: true,
  },
  organizationName: {
    type: String,
    required: [true, commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE],
    minLength: [
      commonConstants.ORGANIZATION_NAME_MIN_LENGTH,
      commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE,
    ],
    trim: true,
  },
  datePosted: {
    type: Schema.Types.Date,
    required: [true, listingFailedValidation.DATE_POSTED_REQUIRED_MESSAGE],
  },
  workType: {
    type: String,
    required: [true, listingFailedValidation.WORK_TYPE_REQUIRED_MESSAGE],
    enum: {
      values: [WorkType.Hybrid, WorkType.On_Site, WorkType.Remote],
      message: listingFailedValidation.WORK_TYPE_INVALID_MESSAGE,
    },
  },
  employmentType: {
    type: String,
    required: [true, listingFailedValidation.EMPLOYMENT_TYPE_REQUIRED_MESSAGE],
    enum: {
      values: [
        EmploymentType.Contract,
        EmploymentType.Full_Time,
        EmploymentType.Part_Time,
        EmploymentType.Temporary,
        EmploymentType.Other,
      ],
      message: listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE,
    },
  },
  experienceLevel: {
    type: String,
    required: [true, listingFailedValidation.EXPERIENCE_LEVEL_REQUIRED_MESSAGE],
    enum: {
      values: [
        ExperienceLevelType.Internship,
        ExperienceLevelType.Entry_Level,
        ExperienceLevelType.Mid_Senior_Level,
        ExperienceLevelType.Associate,
        ExperienceLevelType.Director,
        ExperienceLevelType.Executive,
      ],
      message: listingFailedValidation.EXPERIENCE_LEVEL_INVALID_MESSAGE,
    },
  },
  city: {
    type: String,
    required: [true, listingFailedValidation.CITY_REQUIRED_MESSAGE],
    trim: true,
  },
  country: {
    type: String,
    required: [true, listingFailedValidation.COUNTRY_REQUIRED_MESSAGE],
    match: [COUNTRY_REGEX, commonFailedValidation.COUNTRY_INVALID_MESSAGE],
    trim: true,
  },
  listingDesc: {
    type: String,
    required: [
      true,
      listingFailedValidation.LISTING_DESCRIPTION_REQUIRED_MESSAGE,
    ],
    minLength: [
      commonConstants.GENERIC_MIN_LENGTH,
      listingFailedValidation.LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
    ],
    maxLength: [
      listingConstants.LISTING_DESCRIPTION_MAX_LENGTH,
      listingFailedValidation.LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
    ],
    trim: true,
  },
  salaryRange: {
    type: Schema.Types.Mixed,
  },
  status: {
    type: String,
    required: [true, listingFailedValidation.STATUS_REQUIRED],
    enum: {
      values: [ListingStatus.Open, ListingStatus.Closed],
      message: listingFailedValidation.STATUS_INVALID,
    },
  },
});

export const Listing = model<IListing>("Listing", listingSchema);
