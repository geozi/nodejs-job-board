/**
 * Application validation error messages.
 * @module src/domain/messages/applicationValidation.message
 */
import { commonConstants } from "domain/constants/common.constant";
import { ID_REGEX } from "domain/resources/validationRegExp";

/**
 * Contains error response messages that are used when application validation operations fail.
 *
 * @type {object}
 * @property {string} APPLICATION_ID_REQUIRED_MESSAGE - Message sent when no application ID is provided for application update and/or deletion operations.
 * @property {string} APPLICATION_ID_INVALID_MESSAGE - Message sent when the provided application ID does not match the {@link ID_REGEX}.
 * @property {string} APPLICATION_ID_OUT_OF_LENGTH_MESSAGE - Message sent when the provided application ID is either longer or shorter than the accepted length.
 */
export const applicationFailedValidation = {
  /**
   * Message sent when no application ID is provided for application update and/or deletion operations.
   * @type {string}
   */
  APPLICATION_ID_REQUIRED_MESSAGE: "Application ID is a required field",

  /**
   * Message sent when the provided application ID does not match the {@link ID_REGEX}.
   * @type {string}
   */
  APPLICATION_ID_INVALID_MESSAGE: `Application ID must be a string of hex characters`,

  /**
   * Message sent when the provided application ID is either longer or shorter than the accepted length.
   * @type {string}
   */
  APPLICATION_ID_OUT_OF_LENGTH_MESSAGE: `Application ID must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
};
