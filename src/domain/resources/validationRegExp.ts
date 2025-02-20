/**
 * Regular expressions used in validation processes.
 * @module src/domain/resources/validationRegExp
 */

/**
 * Regular expression used in checking password validity.
 * @type {RegExp}
 */
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
);

/**
 * Regular expression used in checking email validity.
 * @type {RegExp}
 */
export const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);

/**
 * Regular expression used in checking firstName and lastName validity.
 * @type {RegExp}
 */
export const NAME_REGEX = new RegExp(/^[A-Za-z]+$/);

/**
 * Regular expression used in checking country name validity.
 * @type {RegExp}
 */
export const COUNTRY_REGEX = new RegExp(/^[\p{L}\p{Zs}-]+$/u);

/**
 * Regular expression used in checking phoneNumber validity.
 * @type {RegExp}
 */
export const PHONE_REGEX = new RegExp(/^\d+(-\d+)*$/);

/**
 * Regular expression used in checking id validity.
 * @type {RegExp}
 */
export const ID_REGEX = new RegExp(/^[a-f0-9]+$/);

/**
 * Regular expression used in checking date format validity.
 * @type {RegExp}
 */
export const DATE_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
