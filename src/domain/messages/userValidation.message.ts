/**
 * User validation error messages.
 * @module src/domain/messages/userValidation.message
 */
import { commonConstants } from "domain/constants/common.constant";
import { userConstants } from "domain/constants/user.constant";
import { RoleType } from "domain/enums/roleType.enum";
import {
  EMAIL_REGEX,
  ID_REGEX,
  PASSWORD_REGEX,
} from "domain/resources/validationRegExp";

/**
 * Contains error message(s) that are used when user validation fails.
 *
 * @type {object}
 * @property {string} USERNAME_REQUIRED_MESSAGE - Message sent when no username is provided.
 * @property {string} USERNAME_ABOVE_MAX_LENGTH_MESSAGE - Message sent when the provided username is longer than the accepted maximum length.
 * @property {string} USERNAME_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided username is shorter than the accepted minimum length.
 * @property {string} EMAIL_REQUIRED_MESSAGE - Message sent when no email is provided.
 * @property {string} EMAIL_INVALID_MESSAGE - Message sent when the provided email does not match the {@link EMAIL_REGEX}.
 * @property {string} PASSWORD_REQUIRED_MESSAGE - Message sent when no password is provided.
 * @property {string} PASSWORD_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided password is shorter than the accepted minimum length.
 * @property {string} PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE - Message sent when the provided password does not match the {@link PASSWORD_REGEX}.
 * @property {string} ROLE_REQUIRED_MESSAGE - Message sent when no role is provided.
 * @property {string} ROLE_INVALID_MESSAGE - Message sent when the provided role does not comply with the {@link RoleType} enums.
 * @property {string} USER_ID_REQUIRED_MESSAGE - Message sent when no user ID is provided for user update and/or deletion operations.
 * @property {string} USER_ID_INVALID_MESSAGE - Message sent when the provided user ID does not match the {@link ID_REGEX}.
 * @property {string} USER_ID_OUT_OF_LENGTH_MESSAGE - Message sent when the provided user ID is either shorter or longer than the accepted length.
 */
export const userFailedValidation = {
  /**
   * Message sent when no username is provided.
   * @type {string}
   */
  USERNAME_REQUIRED_MESSAGE: "Username is a required field",

  /**
   * Message sent when the provided username is longer than the accepted maximum length.
   * @type {string}
   */
  USERNAME_ABOVE_MAX_LENGTH_MESSAGE: `Username must be no longer than ${userConstants.USERNAME_MAX_LENGTH} characters`,

  /**
   * Message sent when the provided username is shorter than the accepted minimum length.
   * @type {string}
   */
  USERNAME_BELOW_MIN_LENGTH_MESSAGE: `Username must be at least ${userConstants.USERNAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no email is provided.
   * @type {string}
   */
  EMAIL_REQUIRED_MESSAGE: "User email is a required field",

  /**
   * Message sent when the provided email does not match the {@link EMAIL_REGEX}.
   * @type {string}
   */
  EMAIL_INVALID_MESSAGE: "User email is not valid",

  /**
   * Message sent when no password is provided.
   * @type {string}
   */
  PASSWORD_REQUIRED_MESSAGE: "Password is a required field",

  /**
   * Message sent when the provided password is shorter than the accepted minimum length.
   * @type {string}
   */
  PASSWORD_BELOW_MIN_LENGTH_MESSAGE: `Password must be at least ${userConstants.PASSWORD_MIN_LENGTH} characters long`,

  /**
   * Message sent when the provided password does not match the {@link PASSWORD_REGEX}.
   * @type {string}
   */
  PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE: `Password must have at least: one lowercase character, one uppercase character, one number, and one special symbol`,

  /**
   * Message sent when no role is provided.
   * @type {string}
   */
  ROLE_REQUIRED_MESSAGE: "Role is a required field",

  /**
   * Message sent when the provided role does not comply with the {@link RoleType} enums.
   * @type {string}
   */
  ROLE_INVALID_MESSAGE: `Role must be either one of the following: ${RoleType.Admin}, ${RoleType.User}`,

  /**
   * Message sent when no user ID is provided for user update and/or deletion operations.
   * @type {string}
   */
  USER_ID_REQUIRED_MESSAGE: "User ID is a required field",

  /**
   * Message sent when the provided user ID does not match the {@link ID_REGEX}.
   * @type {string}
   */
  USER_ID_INVALID_MESSAGE: "User ID must be a string of hex characters",

  /**
   * Message sent when the provided user ID is either shorter or longer than the accepted length.
   * @type {string}
   */
  USER_ID_OUT_OF_LENGTH_MESSAGE: `User ID must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
};
