/**
 * Salary range validation error messages.
 * @module src/domain/messages/salaryRangeValidation.message
 */
import { ISalaryRange } from "../interfaces/secondary/iSalaryRange.interface";

/**
 * Contains error message(s) that are used when validation of {@link ISalaryRange}-complied objects fails.
 *
 * @type {object}
 * @property {string} MIN_AMOUNT_REQUIRED_MESSAGE - Message sent when no min amount is provided.
 * @property {string} MIN_AMOUNT_NEGATIVE_MESSAGE - Message sent when the provided min amount is negative.
 * @property {string} MIN_AMOUNT_INVALID_MESSAGE - Message sent when the provided min amount is not a number.
 * @property {string} MAX_AMOUNT_REQUIRED_MESSAGE - Message sent when no max amount is provided.
 * @property {string} MAX_AMOUNT_NEGATIVE_MESSAGE - Message sent when the provided max amount is negative.
 * @property {string} MAX_AMOUNT_INVALID_MESSAGE - Message sent when the provided max amount is not a number.
 */
export const salaryRangeFailedValidation = {
  /**
   * Message sent when no min amount is provided.
   * @type {string}
   */
  MIN_AMOUNT_REQUIRED_MESSAGE: "Min amount is a required field",

  /**
   * Message sent when the provided min amount is negative.
   * @type {string}
   */
  MIN_AMOUNT_NEGATIVE_MESSAGE: "Min amount must be a positive number",

  /**
   * Message sent when the provided min amount is not a number.
   * @type {string}
   */
  MIN_AMOUNT_INVALID_MESSAGE: "Min amount must be a number",

  /**
   * Message sent when no max amount is provided.
   * @type {string}
   */
  MAX_AMOUNT_REQUIRED_MESSAGE: "Max amount is a required field",

  /**
   * Message sent when the provided max amount is negative.
   * @type {string}
   */
  MAX_AMOUNT_NEGATIVE_MESSAGE: "Max amount must be a positive number",

  /**
   * Message sent when the provided max amount is not a number.
   * @type {string}
   */
  MAX_AMOUNT_INVALID_MESSAGE: "Max amount must be a number",
};
