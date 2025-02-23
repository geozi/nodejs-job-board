/**
 * Application service layer HTTP responses.
 * @module src/service/messages/applicationService.message
 */

/**
 * Contains application service HTTP response messages used by the service layer and provided to the business layer.
 *
 * @type {object}
 * @property {string} APPLICATION_NOT_FOUND - Message sent when the requested application is not found.
 * @property {string} APPLICATIONS_NOT_FOUND - Message sent when the requested applications are not found.
 */
export const applicationServiceMessages = {
  /**
   * Message sent when the requested application is not found.
   * @type {string}
   */
  APPLICATION_NOT_FOUND: "Application was not found",

  /**
   * Message sent when the requested applications are not found.
   * @type {string}
   */
  APPLICATIONS_NOT_FOUND: "Applications were not found",
};
