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
/**
 * Employment type array.
 * @type {Array<EmploymentType>}
 */
export const employmentTypeArray = [
  EmploymentType.Contract,
  EmploymentType.Full_Time,
  EmploymentType.Part_Time,
  EmploymentType.Temporary,
  EmploymentType.Other,
];

/**
 * Maps EmploymentType strings to EmploymentType enums.
 * @type {object}
 */
export const employmentTypeMap: { [key: string]: EmploymentType } = {
  [EmploymentType.Contract.toString()]: EmploymentType.Contract,
  [EmploymentType.Full_Time.toString()]: EmploymentType.Full_Time,
  [EmploymentType.Part_Time.toString()]: EmploymentType.Part_Time,
  [EmploymentType.Temporary.toString()]: EmploymentType.Temporary,
  [EmploymentType.Other.toString()]: EmploymentType.Other,
};
