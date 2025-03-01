/**
 * EmploymentType enums.
 * @module src/domain/enums/employmentType.enum
 */

/**
 * Enums corresponding to employment types.
 *
 * @readonly
 * @enum
 */
export enum EmploymentType {
  /**
   * Full-time employment type.
   * @readonly
   * @type {string}
   */
  Full_Time = "Full-time",

  /**
   * Part-time employment type.
   * @readonly
   * @type {string}
   */
  Part_Time = "Part-time",

  /**
   * Contract employment type.
   * @readonly
   * @type {string}
   */
  Contract = "Contract",

  /**
   * Temporary employment type.
   * @readonly
   * @type {string}
   */
  Temporary = "Temporary",

  /**
   * Other employment type.
   * @readonly
   * @type {string}
   */
  Other = "Other",
}

export const employmentTypeArray = [
  EmploymentType.Contract,
  EmploymentType.Full_Time,
  EmploymentType.Part_Time,
  EmploymentType.Temporary,
  EmploymentType.Other,
];
