/**
 * Person service layer HTTP responses.
 * @module src/service/messages/personService.message
 */

/**
 * Contains person service HTTP response messages used by the service layer and provided to the business layer.
 *
 * @type {object}
 * @property {string} PERSON_NOT_FOUND - Message sent when the requested person is not found.
 */
export const personServiceMessages = {
  /**
   * Message sent when the requested person is not found.
   * @type {string}
   */
  PERSON_NOT_FOUND: "Person was not found",
};
