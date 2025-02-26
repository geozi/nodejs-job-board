/**
 * IPersonUpdate interface.
 * @module src/business/interfaces/iPersonUpdate.interface
 */
import { Types } from "mongoose";

/**
 * Represents a DTO used in the update of a person's information.
 *
 * @interface
 * @property {Types.ObjectId} id - The ID of a person.
 * @property {string} [firstName] - (Optional) The first name of a person.
 * @property {string} [lastName] - (Optional) The last name of a person.
 * @property {string} [phoneNumber] - (Optional) The phone number of person.
 * @property {string} [address] - (Optional) The address of a person.
 * @property {Date} [dateOfBirth] - (Optional) The date of birth of a person.
 * @property {Object[]} [education] - (Optional) The education of a person as an array of objects.
 * @property {Object[]} [workExperience] - (Optional) The work experience of a person as an array of objects.
 * @property {string} [username] - (Optional) The username of a person.
 */
export interface IPersonUpdate {
  /**
   * The ID of a person.
   * @type {Types.ObjectId}
   */
  id: Types.ObjectId;

  /**
   * (Optional) The first name of a person.
   * @type {string}
   */
  firstName?: string;

  /**
   * (Optional) The last name of a person.
   * @type {string}
   */
  lastName?: string;

  /**
   * (Optional) The phone number of person.
   * @type {string}
   */
  phoneNumber?: string;

  /**
   * (Optional) The address of a person.
   * @type {string}
   */
  address?: string;

  /**
   * (Optional) The date of birth of a person.
   * @type {Date}
   */
  dateOfBirth?: Date;

  /**
   * (Optional) The education of a person as an array of objects.
   * @type {Object[]}
   */
  education?: Object[];

  /**
   * (Optional) The work experience of a person as an array of objects.
   * @type {Object[]}
   */
  workExperience?: Object[];

  /**
   * (Optional) The username of a person.
   * @type {string}
   */
  username?: string;
}
