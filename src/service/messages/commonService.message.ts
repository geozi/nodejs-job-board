/**
 * Common service layer HTTP responses.
 * @module src/service/messages/commonService.message
 */

/**
 * Contains common HTTP response messages used by the service layer and provided to the business layer.
 *
 * @type {object}
 * @property {string} SERVER_ERROR - Message sent when an internal server error occurs.
 */
export const commonServiceMessages = {
  /**
   * Message sent when an internal server error occurs.
   * @type {string}
   */
  SERVER_ERROR: "Internal server error",
};
