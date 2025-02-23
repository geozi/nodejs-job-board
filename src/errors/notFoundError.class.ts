/**
 * NotFoundError class.
 * @module src/errors/notFoundError.class
 */
import { httpCodes } from "../business/codes/responseStatusCodes";
import { AbstractError } from "./abstractError.class";

/**
 * Custom error class for not founding the requested document(s) (404).
 * @extends {AbstractError}
 */
export class NotFoundError extends AbstractError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(httpCodes.NOT_FOUND, message);
    this.name = "NotFoundError";
    this.message = message;
  }
}
