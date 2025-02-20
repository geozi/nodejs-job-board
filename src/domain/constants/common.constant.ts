/**
 * Common constants.
 * @module src/domain/constants/common.constant
 */

/**
 * Contains numeric constants that are used across project files.
 *
 * @type {object}
 * @property {number} ORGANIZATION_NAME_MIN_LENGTH - The minimum length accepted for an organization name.
 * @property {number} GENERIC_MIN_LENGTH - A generic minimum length accepted for use in different fields.
 * @property {number} MONGODB_ID_LENGTH - The length of a MongoDB ObjectId.
 */
export const commonConstants = {
  /**
   * The minimum length accepted for an organization name.
   * @type {number}
   */
  ORGANIZATION_NAME_MIN_LENGTH: 4,

  /**
   * A generic minimum length accepted for use in different fields.
   * @type {number}
   */
  GENERIC_MIN_LENGTH: 10,

  /**
   * The length of a MongoDB ObjectId.
   * @type {number}
   */
  MONGODB_ID_LENGTH: 24,
};
