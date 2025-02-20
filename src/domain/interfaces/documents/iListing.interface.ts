/**
 * IListing interface.
 * @module src/domain/interfaces/iListing.interface
 */
import { Document } from "mongoose";
import { EmploymentType } from "../../enums/employmentType.enum";
import { WorkType } from "../../enums/workType.enum";
import { ExperienceLevelType } from "../../enums/experienceLevelType.enum";
import { ISalaryRange } from "../secondary/iSalaryRange.interface";

/**
 * Represents a job listing.
 *
 * @interface
 * @extends {Document}
 * @property {string} title - The title of the job listing.
 * @property {string} organizationName - The name of the hiring organization.
 * @property {Date} datePosted - The date when the job listing was posted.
 * @property {WorkType} workType - The work type of the job.
 * @property {EmploymentType} employmentType - The employment type of the job.
 * @property {ExperienceLevelType} experienceLevel - The experience level required by the hiring organization.
 * @property {string} city - The city where the job is located.
 * @property {string} country - The country where the job is located.
 * @property {string} listingDesc - The description of the job.
 * @property {ISalaryRange} [salaryRange] - (Optional) The salary range of the job.
 *
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
   * The work type of the job.
   * @type {WorkType}
   */
  workType: WorkType;

  /**
   * The employment type of the job.
   * @type {EmploymentType}
   */
  employmentType: EmploymentType;

  /**
   * The experience level required by the hiring organization.
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
   *  The description of the job.
   * @type {string}
   */
  listingDesc: string;

  /**
   * (Optional) The salary range of the job.
   * @type {string}
   */
  salaryRange?: ISalaryRange;
}
