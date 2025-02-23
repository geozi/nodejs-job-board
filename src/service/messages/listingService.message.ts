/**
 * Listing service layer HTTP responses.
 * @module src/service/messages/listingService.message
 */

/**
 * Contains listing service HTTP responses used by the service layer and provided to the business layer.
 *
 * @type {object}
 * @property {string} LISTING_NOT_FOUND - Message sent when the requested listing is not found.
 * @property {string} LISTINGS_NOT_FOUND - Message sent when the requested listings are not found.
 */
export const listingServiceMessages = {
  /**
   * Message sent when the requested listing is not found.
   * @type {string}
   */
  LISTING_NOT_FOUND: "Listing was not found",

  /**
   * Message sent when the requested listings are not found.
   * @type {string}
   */
  LISTINGS_NOT_FOUND: "Listings were not found",
};
