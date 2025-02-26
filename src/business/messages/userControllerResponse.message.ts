/**
 * User controller HTTP response messages.
 * @module src/business/messages/userControllerResponse.message
 */

/**
 * Contains HTTP response messages sent by the user controller.
 *
 * @type {object}
 * @property {string} USER_REGISTERED - Message sent when a new user is created and successfully added to database.
 * @property {string} USER_UPDATED - Message sent when an existing user is successfully updated.
 * @property {string} USER_RETRIEVED - Message sent when a user is successfully retrieved from database.
 * @property {string} USER_S_RETRIEVED - Message sent when users are successfully retrieved from database.
 */
export const userControllerResponseMessages = {
  /**
   * Message sent when a new user is created and successfully added to database.
   * @type {string}
   */
  USER_REGISTERED: "Successful user registration",

  /**
   * Message sent when an existing user is successfully updated.
   * @type {string}
   */
  USER_UPDATED: "Successful user update",

  /**
   * Message sent when a user is successfully retrieved from database.
   * @type {string}
   */
  USER_RETRIEVED: "Successful user retrieval",

  /**
   * Message sent when users are successfully retrieved from database.
   * @type {string}
   */
  USER_S_RETRIEVED: "Successful retrieval of users",
};
