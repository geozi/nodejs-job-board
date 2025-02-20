/**
 * IEducation interface.
 * @module src/domain/interfaces/secondary/iEducation.interface
 */

/**
 * Represents the education a person has.
 *
 * @interface
 * @property {string} degreeTitle - The title of the degree.
 * @property {string} institution - The name of the educational institution offering the degree.
 * @property {Date} startingDate - The date when the person started the educational program.
 * @property {Date} [graduationDate] - (Optional) The graduation date of the person.
 * @property {Boolean} isOngoing -  A boolean on whether the person has finished studying or continues to study.
 */
export interface IEducation {
  /**
   * The title of the degree.
   * @type {string}
   */
  degreeTitle: string;

  /**
   * The name of the educational institution offering the degree.
   * @type {string}
   */
  institution: string;

  /**
   * The date when the person started the educational program.
   * @type {Date}
   */
  startingDate: Date;

  /**
   * (Optional) The graduation date of the person.
   * @type {Date}
   */
  graduationDate?: Date;

  /**
   * A boolean on whether the person has finished studying or continues to study.
   * @type {Boolean}
   */
  isOngoing: Boolean;
}
