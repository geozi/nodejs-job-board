/**
 * Listing controller HTTP response messages.
 * @module src/business/messages/listingControllerResponse.message
 */

/**
 * Contains HTTP response messages sent by the Listing controller.
 *
 * @type {object}
 * @property {string} LISTING_CREATED - Message sent when a new listing is created and successfully added to database.
 * @property {string} LISTING_UPDATED - Message sent when an existing listing is successfully updated.
 * @property {string} LISTING_RETRIEVED - Message sent when a listing is successfully retrieved from database.
 * @property {string} LISTING_S_RETRIEVED - Message sent when listings are successfully retrieved from database.
 */
export const listingControllerResponseMessages = {
  /**
   * Message sent when a new listing is created and successfully added to database.
   * @type {string}
   */
  LISTING_CREATED: "Successful listing creation",

  /**
   * Message sent when an existing listing is successfully updated.
   * @type {string}
   */
  LISTING_UPDATED: "Successful listing update",

  /**
   * Message sent when a listing is successfully retrieved from database.
   * @type {string}
   */
  LISTING_RETRIEVED: "Successful listing retrieval",

  /**
   * Message sent when listings are successfully retrieved from database.
   * @type {string}
   */
  LISTING_S_RETRIEVED: "Successful retrieval of listings",
};
