/**
 * IWorkExperience interface.
 * @module src/domain/interfaces/secondary/iWorkExperience.interface
 */
import { ITask } from "./iTask.interface";

/**
 * Represents the work experience a person has.
 *
 * @interface
 * @property {string} jobTitle - The title of the job.
 * @property {string} organizationName - The name of the employer organization.
 * @property {string} city - The city where the job was/is located.
 * @property {string} [country] - (Optional) The country where the job was/is located.
 * @property {Date} startingDate - The date when the person started to work.
 * @property {Date} [endingDate] - (Optional) the ending date of the contract.
 * @property {Boolean} isOngoing - A boolean on whether the person has finished working or continues to work.
 * @property {ITask[]} tasks - The tasks of the job.
 *
 */
export interface IWorkExperience {
  /**
   * The title of the job.
   * @type {string}
   */
  jobTitle: string;

  /**
   * The name of the employer organization.
   * @type {string}
   */
  organizationName: string;

  /**
   * The city where the job was/is located.
   * @type {string}
   */
  city: string;

  /**
   * (Optional) The country where the job was/is located.
   * @type {string}
   */
  country?: string;

  /**
   * The date when the person started to work.
   * @type {Date}
   */
  startingDate: Date;

  /**
   * (Optional) the ending date of the contract.
   * @type {Date}
   */
  endingDate?: Date;

  /**
   * A boolean on whether the person has finished working or continues to work.
   * @type {Boolean}
   */
  isOngoing: Boolean;

  /**
   * The tasks of the job.
   * @type {ITask[]}
   */
  tasks?: ITask[];
}
