/**
 * IPerson interface.
 * @module src/domain/interfaces/documents/iPerson.interface
 */
import { Document } from "mongoose";

/**
 * Represents a person.
 *
 * @interface
 * @extends {Document}
 * @property {string} firstName - The first name of the person.
 * @property {string} lastName - The last name of the person.
 * @property {string} phoneNumber - The phone number of the person.
 * @property {string} address - The address of the person.
 * @property {Date} [dateOfBirth] - (Optional) The date of birth of the person.
 * @property {Object[]} education - The education of the person as an array of objects.
 * @property {Object[]} workExperience - The work experience of the person as an array of objects.
 * @property {string} username - The username of the person.
 *
 */
export interface IPerson extends Document {
  /**
   * The first name of the person.
   * @type {string}
   */
  firstName: string;

  /**
   *  The last name of the person.
   * @type {string}
   */
  lastName: string;

  /**
   * The phone number of the person.
   * @type {string}
   */
  phoneNumber: string;

  /**
   * The address of the person.
   * @type {string}
   */
  address: string;

  /**
   * (Optional) The date of birth of the person..
   * @type {Date}
   */
  dateOfBirth?: Date;

  /**
   * The education of the person as an array of objects.
   * @type { Object[]}
   */
  education: Object[];

  /**
   * The work experience of the person as an array of objects.
   * @type { Object[]}
   */
  workExperience: Object[];

  /**
   * The username of the person.
   * @type {string}
   */
  username: string;
}
