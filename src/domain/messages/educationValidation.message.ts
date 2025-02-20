/**
 * Education validation error messages.
 * @module src/domain/messages/educationValidation.message
 */
import { commonConstants } from "../constants/common.constant";
import { DATE_REGEX } from "../resources/validationRegExp";
import { IEducation } from "../interfaces/secondary/iEducation.interface";

/**
 * Contains error message(s) that are used when validation of {@link IEducation}-complied objects fails.
 *
 * @type {object}
 * @property {string} DEGREE_TITLE_REQUIRED_MESSAGE - Message sent when no degree title is provided.
 * @property {string} DEGREE_TITLE_MIN_LENGTH_MESSAGE - Message sent when the provided degree title is shorter than the accepted minimum length.
 * @property {string} INSTITUTION_REQUIRED_MESSAGE - Message sent when no institution name is provided.
 * @property {string} INSTITUTION_MIN_LENGTH_MESSAGE - Message sent when the provided institution name is shorter than the accepted minimum length.
 * @property {string} STARTING_DATE_REQUIRED_MESSAGE - Message sent when no starting date is provided.
 * @property {string} STARTING_DATE_INVALID_MESSAGE - Message sent when the provided starting date does not match the {@link DATE_REGEX}.
 * @property {string} GRADUATION_DATE_INVALID_MESSAGE - Message sent when the provided graduation date does not match the {@link DATE_REGEX}.
 */
export const educationFailedValidation = {
  /**
   * Message sent when no degree title is provided.
   * @type {string}
   */
  DEGREE_TITLE_REQUIRED_MESSAGE: "Degree title is a required field",

  /**
   * Message sent when the provided degree title is shorter than the accepted minimum length.
   * @type {string}
   */
  DEGREE_TITLE_MIN_LENGTH_MESSAGE: `Degree title must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,

  /**
   * Message sent when no institution name is provided.
   * @type {string}
   */
  INSTITUTION_REQUIRED_MESSAGE: "Institution is a required field",

  /**
   * Message sent when the provided institution name is shorter than the accepted minimum length.
   * @type {string}
   */
  INSTITUTION_MIN_LENGTH_MESSAGE: `Institution must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,

  /**
   * Message sent when no starting date is provided.
   * @type {string}
   */
  STARTING_DATE_REQUIRED_MESSAGE: "Starting date is a required field",

  /**
   * Message sent when the provided starting date does not match the {@link DATE_REGEX}.
   * @type {string}
   */
  STARTING_DATE_INVALID_MESSAGE: "Starting date must be a valid date",

  /**
   * Message sent when the provided graduation date does not match the {@link DATE_REGEX}.
   * @type {string}
   */
  GRADUATION_DATE_INVALID_MESSAGE: "Graduation date must be a valid date",
};
