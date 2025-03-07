/**
 * Auth response messages.
 * @module src/auth/authResponse.message
 */

/**
 * Contains authentication and authorization response messages.
 *
 * @type {object}
 * @property {string} AUTHENTICATION_FAILED - Message sent when authentication has failed.
 * @property {string} AUTHENTICATION_SUCCESS - Message sent when authentication is successful.
 * @property {string} AUTHORIZATION_HEADER_REQUIRED - Message sent when the login request does not contain an authorization header.
 * @property {string} AUTHORIZATION_TOKEN_INVALID - Message sent when the token in the HTTP request does not match the standard regex pattern.
 * @property {string} AUTHORIZATION_FAILED - Message sent when authorization has failed.
 */
export const authResponseMessages = {
  /**
   * Message sent when authentication has failed.
   * @type {string}
   */
  AUTHENTICATION_FAILED: "Authentication failed",

  /**
   * Message sent when authentication is successful.
   * @type {string}
   */
  AUTHENTICATION_SUCCESS: "Authentication success",

  /**
   * Message sent when the login request does not contain an authorization header.
   * @type {string}
   */
  AUTHORIZATION_HEADER_REQUIRED: "Authorization header is required",

  /**
   * Message sent when the token in the HTTP request does not match the standard regex pattern.
   * @type {string}
   */
  AUTHORIZATION_TOKEN_INVALID: "Token is invalid",

  /**
   * Message sent when authorization has failed.
   * @type {string}
   */
  AUTHORIZATION_FAILED: "Authorization failed",
};
