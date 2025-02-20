/**
 * Common validation error messages.
 * @module src/domain/messages/commonValidation.message
 */
import { commonConstants } from "../constants/common.constant";
import { COUNTRY_REGEX } from "../resources/validationRegExp";

/**
 * Contains error response message(s) that are used when common validation operations fail.
 *
 * @type {object}
 * @property {string} ORGANIZATION_NAME_REQUIRED_MESSAGE - Message sent when no organization name is provided.
 * @property {string} ORGANIZATION_NAME_MIN_LENGTH_MESSAGE - Message sent when the provided organization name is shorter than the accepted minimum length.
 * @property {string} IS_ONGOING_REQUIRED_MESSAGE - Message sent when no isOngoing field is provided.
 * @property {string} IS_ONGOING_INVALID_MESSAGE - Message sent when the provided isOngoing field is not boolean.
 * @property {string} COUNTRY_INVALID_MESSAGE - Message sent when the provided country name does not match the {@link COUNTRY_REGEX}.
 */
export const commonFailedValidation = {
  /**
   * Message sent when no organization name is provided.
   * @type {string}
   */
  ORGANIZATION_NAME_REQUIRED_MESSAGE: "Organization name is a required field",

  /**
   * Message sent when the provided organization name is shorter than the accepted minimum length.
   * @type {string}
   */
  ORGANIZATION_NAME_MIN_LENGTH_MESSAGE: `Organization name must be at least ${commonConstants.ORGANIZATION_NAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no isOngoing field is provided.
   * @type {string}
   */
  IS_ONGOING_REQUIRED_MESSAGE: "IsOngoing is a required field",

  /**
   * Message sent when the provided isOngoing field is not boolean.
   * @type {string}
   */
  IS_ONGOING_INVALID_MESSAGE: "IsOngoing must be either true or false",

  /**
   * Message sent when the provided country name does not match the {@link COUNTRY_REGEX}.
   * @type {string}
   */
  COUNTRY_INVALID_MESSAGE: `Country must only contain letters and/or whitespaces`,
};
