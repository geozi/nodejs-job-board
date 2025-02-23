/**
 * Listing validation error messages.
 * @module src/domain/messages/listingValidation.message
 */
import { commonConstants } from "../constants/common.constant";
import { listingConstants } from "../constants/listing.constant";
import { EmploymentType } from "../enums/employmentType.enum";
import { ExperienceLevelType } from "../enums/experienceLevelType.enum";
import { WorkType } from "../enums/workType.enum";
import { DATE_REGEX, ID_REGEX } from "../resources/validationRegExp";
import { ListingStatus } from "../enums/listingStatus.enum";

/**
 * Contains error message(s) that are used when listing validation fails.
 *
 * @type {object}
 * @property {string} TITLE_REQUIRED_MESSAGE - Message sent when no title is provided.
 * @property {string} DATE_POSTED_REQUIRED_MESSAGE - Message sent when no post date is provided.
 * @property {string} DATE_POSTED_INVALID_MESSAGE - Message sent when the provided post date does not match the {@link DATE_REGEX}.
 * @property {string} WORK_TYPE_REQUIRED_MESSAGE - Message sent when no work type is provided.
 * @property {string} WORK_TYPE_INVALID_MESSAGE - Message sent when the provided work type does not comply with the {@link WorkType} enums.
 * @property {string} EMPLOYMENT_TYPE_REQUIRED_MESSAGE - Message sent when no employment type is provided.
 * @property {string} EMPLOYMENT_TYPE_INVALID_MESSAGE - Message sent when the provided employment type does not comply with the {@link EmploymentType} enums.
 * @property {string} EXPERIENCE_LEVEL_REQUIRED_MESSAGE - Message sent when no experience level is provided.
 *@property {string} EXPERIENCE_LEVEL_INVALID_MESSAGE - Message sent when the provided experience level does not comply with the {@link ExperienceLevelType} enums.
 @property {string} CITY_REQUIRED_MESSAGE - Message sent when no city is provided.
 @property {string} COUNTRY_REQUIRED_MESSAGE - Message sent when no country is provided.
 @property {string} LISTING_DESCRIPTION_REQUIRED_MESSAGE - Message sent when no listing description is provided.
 @property {string} LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided listing description is shorter than the accepted minimum length.
 @property {string} LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE - Message sent when the provided listing description is longer than the accepted minimum length.
 @property {string} STATUS_REQUIRED - Message sent when no status is provided.
 @property {string} STATUS_INVALID - Message sent when the provided status does not comply with the {@link ListingStatus} enums.
 @property {string} LISTING_ID_REQUIRED_MESSAGE - Message sent when no listing ID is provided for application, listing update and/or deletion operations.
 @property {string} LISTING_ID_INVALID_MESSAGE - Message sent when the provided listing ID does not match the {@link ID_REGEX}.
 @property {string} LISTING_ID_OUT_OF_LENGTH_MESSAGE - Message sent when the provided listing ID is either shorter or longer than the accepted length.
 */
export const listingFailedValidation = {
  /**
   * Message sent when no title is provided.
   * @type {string}
   */
  TITLE_REQUIRED_MESSAGE: "Title is a required field",

  /**
   * Message sent when no post date is provided.
   * @type {string}
   */
  DATE_POSTED_REQUIRED_MESSAGE: "Post date is a required field",

  /**
   * Message sent when the provided post date does not match the {@link DATE_REGEX}.
   * @type {string}
   */
  DATE_POSTED_INVALID_MESSAGE: "Post date must be a valid date",

  /**
   * Message sent when no work type is provided.
   * @type {string}
   */
  WORK_TYPE_REQUIRED_MESSAGE: "Work type is a required field",

  /**
   * Message sent when the provided work type does not comply with the {@link WorkType} enums.
   * @type {string}
   */
  WORK_TYPE_INVALID_MESSAGE: `Work type must be one of the following: ${WorkType.Hybrid}, ${WorkType.On_Site}, ${WorkType.Remote}`,

  /**
   * Message sent when no employment type is provided.
   * @type {string}
   */
  EMPLOYMENT_TYPE_REQUIRED_MESSAGE: "Employment type is a required field",

  /**
   * Message sent when the provided employment type does not comply with the {@link EmploymentType} enums.
   * @type {string}
   */
  EMPLOYMENT_TYPE_INVALID_MESSAGE: `Employment type must be one of the following: ${EmploymentType.Contract}, ${EmploymentType.Full_Time}, ${EmploymentType.Part_Time}, ${EmploymentType.Temporary}, ${EmploymentType.Other}`,

  /**
   * Message sent when no experience level is provided.
   * @type {string}
   */
  EXPERIENCE_LEVEL_REQUIRED_MESSAGE: "Experience level is a required field",

  /**
   * Message sent when the provided experience level does not comply with the {@link ExperienceLevelType} enums.
   * @type {string}
   */
  EXPERIENCE_LEVEL_INVALID_MESSAGE: `Experience level must be one of the following: ${ExperienceLevelType.Internship}, ${ExperienceLevelType.Entry_Level}, ${ExperienceLevelType.Mid_Senior_Level}, ${ExperienceLevelType.Associate}, ${ExperienceLevelType.Director}, ${ExperienceLevelType.Executive}`,

  /**
   * Message sent when no city is provided.
   * @type {string}
   */
  CITY_REQUIRED_MESSAGE: "City is a required field",

  /**
   * Message sent when no country is provided.
   * @type {string}
   */
  COUNTRY_REQUIRED_MESSAGE: "Country is a required field",

  /**
   * Message sent when no listing description is provided.
   * @type {string}
   */
  LISTING_DESCRIPTION_REQUIRED_MESSAGE: `Listing description is a required field`,

  /**
   * Message sent when the provided listing description is shorter than the accepted minimum length.
   * @type {string}
   */
  LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE: `Listing description must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,

  /**
   * Message sent when the provided listing description is longer than the accepted minimum length.
   * @type {string}
   */
  LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE: `Listing description must be no longer than ${listingConstants.LISTING_DESCRIPTION_MAX_LENGTH} characters`,

  /**
   * Message sent when no status is provided.
   * @type {string}
   */
  STATUS_REQUIRED: "Status is a required field",

  /**
   * Message sent when the provided status does not comply with the {@link ListingStatus} enums.
   * @type {string}
   */
  STATUS_INVALID: `Status must be one the following: ${ListingStatus.Open}, ${ListingStatus.Closed}`,

  /**
   * Message sent when no listing ID is provided for application, listing update and/or deletion operations.
   * @type {string}
   */
  LISTING_ID_REQUIRED_MESSAGE: "Listing ID is a required field",

  /**
   * Message sent when the provided listing ID does not match the {@link ID_REGEX}.
   * @type {string}
   */
  LISTING_ID_INVALID_MESSAGE: "Listing ID must be a string of hex characters",

  /**
   * Message sent when the provided listing ID is either shorter or longer than the accepted length.
   * @type {string}
   */
  LISTING_ID_OUT_OF_LENGTH_MESSAGE: `Listing ID must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
};
