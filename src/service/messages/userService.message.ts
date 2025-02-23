/**
 * User service layer HTTP responses.
 * @module src/service/messages/userService.message
 */

/**
 * Contains user service HTTP response messages used by the service layer and provided to the business layer.
 *
 * @type {object}
 * @property {string} USER_NOT_FOUND - Message sent when the requested user is not found.
 * @property {string} USERS_NOT_FOUND - Message sent when the requested users are not found.
 */
export const userServiceMessages = {
  /**
   * Message sent when the requested user is not found.
   * @type {string}
   */
  USER_NOT_FOUND: "User was not found",

  /**
   * Message sent when the requested users are not found.
   * @type {string}
   */
  USERS_NOT_FOUND: "Users were not found",
};
