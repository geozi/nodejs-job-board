/**
 * ListingStatus enums.
 * @module src/domain/enums/listingStatus.enum
 */

/**
 * Enums corresponding to listing statuses.
 *
 * @readonly
 * @enum
 */
export enum ListingStatus {
  /**
   * Open status.
   * @readonly
   * @type {string}
   */
  Open = "Open",

  /**
   * Closed status.
   * @readonly
   * @type {string}
   */
  Closed = "Closed",
}

/**
 * Listing status array.
 * @type {Array<ListingStatus>}
 */
export const listingStatusArray = [ListingStatus.Closed, ListingStatus.Open];
