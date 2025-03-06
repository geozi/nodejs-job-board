/**
 * Application controller HTTP response messages.
 * @module src/business/messages/applicationControllerResponse.message
 */

/**
 * Contains HTTP response messages sent by the Application controller.
 *
 * @type {object}
 * @property {string} APPLICATION_CREATED - Message sent when a new application is created and successfully added to database.
 * @property {string} APPLICATION_RETRIEVED - Message sent when an application is successfully retrieved from database.
 * @property {string} APPLICATION_S_RETRIEVED - Message sent when applications are successfully retrieved from database.
 */
export const applicationControllerResponseMessages = {
  /**
   * Message sent when a new application is created and successfully added to database.
   * @type {string}
   */
  APPLICATION_CREATED: "Successful application creation",

  /**
   * Message sent when an application is successfully retrieved from database.
   * @type {string}
   */
  APPLICATION_RETRIEVED: "Successful application retrieval",

  /**
   * Message sent when applications are successfully retrieved from database.
   * @type {string}
   */
  APPLICATION_S_RETRIEVED: "Successful retrieval of applications",
};
