/**
 * Person controller HTTP response messages.
 * @module src/business/messages/personControllerResponse.message
 */

/**
 * Contains HTTP response messages sent by the Person controller.
 *
 * @type {object}
 * @property {string} PERSON_REGISTERED - Message sent when new personal information is successfully registered.
 * @property {string} PERSON_UPDATED - Message sent when personal information is successfully updated.
 * @property {string} PERSON_RETRIEVED - Message sent when individual personal information is successfully retrieved.
 */
export const personControllerResponseMessages = {
  /**
   * Message sent when new personal information is successfully registered.
   * @type {string}
   */
  PERSON_REGISTERED: "Successful personal info registration",

  /**
   * Message sent when personal information is successfully updated.
   * @type {string}
   */
  PERSON_UPDATED: "Successful personal info update",

  /**
   * Message sent when individual personal information is successfully retrieved.
   * @type {string}
   */
  PERSON_RETRIEVED: "Successful personal info retrieval",
};
