/**
 * IListingUpdate interface.
 * @module src/business/interfaces/iListingUpdate.interface
 */
import { Types } from "mongoose";
import { WorkType } from "../../domain/enums/workType.enum";
import { EmploymentType } from "../../domain/enums/employmentType.enum";
import { ExperienceLevelType } from "../../domain/enums/experienceLevelType.enum";
import { ISalaryRange } from "../../domain/interfaces/secondary/iSalaryRange.interface";
import { ListingStatus } from "../../domain/enums/listingStatus.enum";

/**
 * Represents a DTO used in the update of listings.
 *
 * @interface
 * @property {Types.ObjectId} id - The ID of an existing listing.
 * @property {string} [title] - (Optional) The title of an existing job listing.
 * @property {string} [organizationName] - (Optional) The name of the hiring organization.
 * @property {Date} [datePosted] - (Optional) The date when the job listing was posted.
 * @property {WorkType} [workType] - (Optional) An enum representing the work type assigned to the listing.
 * @property {EmploymentType} [employmentType] - (Optional) An enum representing the employment type assigned to the listing.
 * @property {ExperienceLevelType} [experienceLevel] - (Optional) An enum representing the experience level required by the hiring organization.
 * @property {string} [city] - (Optional) The city where the job is located.
 * @property {string} [country] - (Optional) The country where the job is located.
 * @property {string} [listingDesc] - (Optional) The description of the job.
 * @property {ISalaryRange} [salaryRange] - (Optional) The salary range of the job.
 * @property {ListingStatus} [status] - (Optional) An enum representing the status of the listing.
 */
export interface IListingUpdate {
  /**
   * The ID of an existing listing.
   * @type {Types.ObjectId}
   */
  id: Types.ObjectId;

  /**
   * (Optional) The title of an existing job listing.
   * @type {string}
   */
  title?: string;

  /**
   * (Optional) The name of the hiring organization.
   * @type {string}
   */
  organizationName?: string;

  /**
   * (Optional) The date when the job listing was posted.
   * @type {Date}
   */
  datePosted?: Date;

  /**
   * (Optional) An enum representing the work type assigned to the listing.
   * @type {WorkType}
   */
  workType?: WorkType;

  /**
   * (Optional) An enum representing the employment type assigned to the listing.
   * @type {EmploymentType}
   */
  employmentType?: EmploymentType;

  /**
   * (Optional) An enum representing the experience level required by the hiring organization.
   * @type {ExperienceLevelType}
   */
  experienceLevel?: ExperienceLevelType;

  /**
   * (Optional) The city where the job is located.
   * @type {string}
   */
  city?: string;

  /**
   * (Optional) The country where the job is located.
   * @type {string}
   */
  country?: string;

  /**
   * (Optional) The description of the job.
   * @type {string}
   */
  listingDesc?: string;

  /**
   * (Optional) The salary range of the job.
   * @type {ISalaryRange}
   */
  salaryRange?: ISalaryRange;

  /**
   * (Optional) An enum representing the status of the listing.
   * @type {ListingStatus}
   */
  status?: ListingStatus;
}
