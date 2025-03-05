/**
 * Unique constraint error.
 * @module src/domain/errors/uniqueConstraintError.class
 */

import { httpCodes } from "business/codes/responseStatusCodes";
import { AbstractError } from "./abstractError.class";

/**
 * Custom error class for violation of uniqueness (409).
 * @extends {AbstractError}
 */
export class UniqueConstraintError extends AbstractError {
  /**
   * Creates an instance of UniqueConstraintError.
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(httpCodes.CONFLICT, message);
    this.name = "UniqueConstraintError";
    this.message = message;
  }
}
