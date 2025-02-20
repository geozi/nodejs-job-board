/**
 * ISalaryRange interface.
 * @module src/domain/interfaces/secondary/iSalaryRange.interface
 */

/**
 * Represents the salary range of a job opening.
 *
 * @interface
 * @property {number} minAmount - The minimum amount possible of the offered salary.
 * @property {number} maxAmount - The maximum amount possible of the offered salary.
 */
export interface ISalaryRange {
  /**
   * The minimum amount possible of the offered salary.
   * @type {number}
   */
  minAmount: number;

  /**
   * The maximum amount possible of the offered salary.
   * @type {number}
   */
  maxAmount: number;
}
