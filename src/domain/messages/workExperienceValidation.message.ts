/**
 * Work experience validation error messages.
 * @module src/domain/messages/workExperienceValidation.message
 */
import { workExperienceConstants } from "domain/constants/workExperience.constant";
import { IWorkExperience } from "domain/interfaces/secondary/iWorkExperience.interface";
import { DATE_REGEX } from "domain/resources/validationRegExp";

/**
 * Contains error message(s) that are used when validation of {@link IWorkExperience}-complied objects fails.
 *
 * @type {object}
 * @property {string} JOB_TITLE_REQUIRED_MESSAGE - Message sent when no job title is provided.
 * @property {string} JOB_TITLE_MIN_LENGTH_MESSAGE - Message sent when the provided job title is shorter than the accepted minimum length.
 * @property {string} CITY_REQUIRED_MESSAGE - Message sent when no city is provided.
 * @property {string} STARTING_DATE_REQUIRED_MESSAGE - Message sent when no starting date is provided.
 * @property {string} STARTING_DATE_INVALID_MESSAGE - Message sent when the provided starting date does not match the {@link DATE_REGEX}.
 * @property {string} ENDING_DATE_INVALID_MESSAGE - Message sent when the provided ending date does not match the {@link DATE_REGEX}.
 */
export const workExperienceFailedValidation = {
  /**
   * Message sent when no job title is provided.
   * @type {string}
   */
  JOB_TITLE_REQUIRED_MESSAGE: "Job title is a required field",

  /**
   * Message sent when the provided job title is shorter than the accepted minimum length.
   * @type {string}
   */
  JOB_TITLE_MIN_LENGTH_MESSAGE: `Job title must be at least ${workExperienceConstants.JOB_TITLE_MIN_LENGTH} characters long`,

  /**
   * Message sent when no city is provided.
   * @type {string}
   */
  CITY_REQUIRED_MESSAGE: "City is a required field",

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
   * Message sent when the provided ending date does not match the {@link DATE_REGEX}.
   * @type {string}
   */
  ENDING_DATE_INVALID_MESSAGE: "Ending date must be a valid date",
};
