/**
 * Regular expressions used in auth validation processes.
 * @module src/auth/authRegExp
 */

/**
 * Regular expression used in checking token validity.
 * @type {RegExp}
 */
export const TOKEN_REGEX = new RegExp(
  /^Bearer [A-Za-z0-9-_=]+\.([A-Za-z0-9-_=]+\.)*[A-Za-z0-9-_.+/=]*$/
);
