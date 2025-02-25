/**
 * IListing interface.
 * @module src/domain/interfaces/documents/iListing.interface
 */
import { Document } from "mongoose";
import { EmploymentType } from "../../enums/employmentType.enum";
import { WorkType } from "../../enums/workType.enum";
import { ExperienceLevelType } from "../../enums/experienceLevelType.enum";
import { ISalaryRange } from "../secondary/iSalaryRange.interface";
import { ListingStatus } from "../../enums/listingStatus.enum";

/**
 * Represents a job listing.
 *
 * @interface
 * @extends {Document}
 * @property {string} title - The title of the job listing.
 * @property {string} organizationName - The name of the hiring organization.
 * @property {Date} datePosted - The date when the job listing was posted.
 * @property {WorkType} workType - An enum representing the work type of the job.
 * @property {EmploymentType} employmentType - An enum representing the employment type of the job.
 * @property {ExperienceLevelType} experienceLevel - An enum representing the experience level required by the hiring organization.
 * @property {string} city - The city where the job is located.
 * @property {string} country - The country where the job is located.
 * @property {string} listingDesc - The description of the job.
 * @property {ISalaryRange} [salaryRange] - (Optional) The salary range of the job.
 * @property {ListingStatus} status - An enum representing the status of the listing.
 */
export interface IListing extends Document {
  /**
   * The title of the job listing.
   * @type {string}
   */
  title: string;

  /**
   * The name of the hiring organization.
   * @type {string}
   */
  organizationName: string;

  /**
   * The date when the job listing was posted.
   * @type {Date}
   */
  datePosted: Date;

  /**
   * An enum representing the work type of the job.
   * @type {WorkType}
   */
  workType: WorkType;

  /**
   * An enum representing the employment type of the job.
   * @type {EmploymentType}
   */
  employmentType: EmploymentType;

  /**
   * An enum representing the experience level required by the hiring organization.
   * @type {ExperienceLevelType}
   */
  experienceLevel: ExperienceLevelType;

  /**
   * The city where the job is located.
   * @type {string}
   */
  city: string;

  /**
   * The country where the job is located.
   * @type {string}
   */
  country: string;

  /**
   * The description of the job.
   * @type {string}
   */
  listingDesc: string;

  /**
   * (Optional) The salary range of the job.
   * @type {ISalaryRange}
   */
  salaryRange?: ISalaryRange;

  /**
   * An enum representing the status of the listing.
   * @type {ListingStatus}
   */
  status: ListingStatus;
}
