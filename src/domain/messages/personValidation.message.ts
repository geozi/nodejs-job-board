/**
 * Person validation error messages.
 * @module src/domain/messages/personValidation.message
 */
import { commonConstants } from "domain/constants/common.constant";
import { personConstants } from "domain/constants/person.constant";
import {
  NAME_REGEX,
  PHONE_REGEX,
  DATE_REGEX,
  ID_REGEX,
} from "domain/resources/validationRegExp";

/**
 * Contains error message(s) that are used when person validation fails.
 *
 * @type {object}
 * @property {string} FIRST_NAME_REQUIRED_MESSAGE - Message sent when no first name is provided.
 * @property {string} FIRST_NAME_INVALID_MESSAGE - Message sent when the provided first name does not match the {@link NAME_REGEX}.
 * @property {string} FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided first name is shorter than the accepted minimum length.
 * @property {string} LAST_NAME_REQUIRED_MESSAGE - Message sent when no last name is provided.
 * @property {string} LAST_NAME_INVALID_MESSAGE - Message sent when the provided last name does not match the {@link NAME_REGEX}.
 * @property {string} LAST_NAME_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided last name is shorter than the accepted minimum length.
 * @property {string} PHONE_NUMBER_REQUIRED_MESSAGE - Message sent when no phone number is provided.
 * @property {string} PHONE_NUMBER_INVALID_MESSAGE - Message sent when the provided phone number does not match the {@link PHONE_REGEX}.
 * @property {string} ADDRESS_REQUIRED_MESSAGE - Message sent when no address is provided.
 * @property {string} ADDRESS_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided address is shorter than the accepted minimum length.
 * @property {string} DATE_OF_BIRTH_INVALID_MESSAGE - Message sent when the provided date of birth does not match the {@link DATE_REGEX}.
 * @property {string} EDUCATION_REQUIRED - Message sent when the education field is not provided.
 * @property {string} EDUCATION_INVALID_FORMAT - Message sent when the education field is not an array.
 * @property {string} EDUCATION_TOO_LONG - Message sent when the education array contains more than the accepted number of records.
 * @property {string} WORK_EXPERIENCE_REQUIRED - Message sent when the work experience field is not provided.
 * @property {string} WORK_EXPERIENCE_INVALID_FORMAT - Message sent when the work experience field is not an array.
 * @property {string} WORK_EXPERIENCE_TOO_LONG - Message sent when the work experience array contains more than the accepted number of records.
 * @property {string} PERSON_ID_REQUIRED_MESSAGE - Message sent when no person ID is provided for application, person info update and/or deletion operations.
 * @property {string} PERSON_ID_INVALID_MESSAGE - Message sent when the provided person ID does not match the {@link ID_REGEX}.
 * @property {string} PERSON_ID_OUT_OF_LENGTH_MESSAGE - Message sent when the provided person ID is either longer or shorter than the accepted length.
 */
export const personFailedValidation = {
  /**
   * Message sent when no first name is provided.
   * @type {string}
   */
  FIRST_NAME_REQUIRED_MESSAGE: "First name is a required field",

  /**
   * Message sent when the provided first name does not match the {@link NAME_REGEX}.
   * @type {string}
   */
  FIRST_NAME_INVALID_MESSAGE: "First name must only contain letters",

  /**
   * Message sent when the provided first name is shorter than the accepted minimum length.
   * @type {string}
   */
  FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE: `First name must be at least ${personConstants.PERSON_NAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no last name is provided.
   * @type {string}
   */
  LAST_NAME_REQUIRED_MESSAGE: "Last name is a required field",

  /**
   * Message sent when the provided last name does not match the {@link NAME_REGEX}.
   * @type {string}
   */
  LAST_NAME_INVALID_MESSAGE: "Last name must only contain letters",

  /**
   * Message sent when the provided last name is shorter than the accepted minimum length.
   * @type {string}
   */
  LAST_NAME_BELOW_MIN_LENGTH_MESSAGE: `Last name must be at least ${personConstants.PERSON_NAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no phone number is provided.
   * @type {string}
   */
  PHONE_NUMBER_REQUIRED_MESSAGE: "Phone number is a required field",

  /**
   * Message sent when the provided phone number does not match the {@link PHONE_REGEX}.
   * @type {string}
   */
  PHONE_NUMBER_INVALID_MESSAGE: `Phone number must only contain digits and/or hyphens`,

  /**
   * Message sent when no address is provided.
   * @type {string}
   */
  ADDRESS_REQUIRED_MESSAGE: "Address is a required field",

  /**
   * Message sent when the provided address is shorter than the accepted minimum length.
   * @type {string}
   */
  ADDRESS_BELOW_MIN_LENGTH_MESSAGE: `Address must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,

  /**
   * Message sent when the provided date of birth does not match the {@link DATE_REGEX}.
   * @type {string}
   */
  DATE_OF_BIRTH_INVALID_MESSAGE: "Date of Birth must be a valid date",

  /**
   * Message sent when the education field is not provided.
   * @type {string}
   */
  EDUCATION_REQUIRED: "Education is a required field",

  /**
   * Message sent when the education field is not an array.
   * @type {string}
   */
  EDUCATION_INVALID_FORMAT: "Education field must be an array",

  /**
   * Message sent when the education array contains more than the accepted number of records.
   * @type {string}
   */
  EDUCATION_TOO_LONG: `Education field must not contain more than ${personConstants.EDU_RECORD_MIN_NUMBER} records`,

  /**
   * Message sent when the work experience field is not provided.
   * @type {string}
   */
  WORK_EXPERIENCE_REQUIRED: "Work experience is a required field",

  /**
   * Message sent when the work experience field is not an array.
   * @type {string}
   */
  WORK_EXPERIENCE_INVALID_FORMAT: "Work experience field must be an array",

  /**
   * Message sent when the work experience array contains more than the accepted number of records.
   * @type {string}
   */
  WORK_EXPERIENCE_TOO_LONG: `Work experience field must not contain more than ${personConstants.WORK_EXPERIENCE_MIN_NUMBER} records`,

  /**
   * Message sent when no person ID is provided for application, person info update and/or deletion operations.
   * @type {string}
   */
  PERSON_ID_REQUIRED_MESSAGE: "Person ID is a required field",

  /**
   * Message sent when the provided person ID does not match the {@link ID_REGEX}.
   * @type {string}
   */
  PERSON_ID_INVALID_MESSAGE: "Person ID must be a string of hex characters",

  /**
   * Message sent when the provided person ID is either longer or shorter than the accepted length.
   * @type {string}
   */
  PERSON_ID_OUT_OF_LENGTH_MESSAGE: `Person ID must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
};
