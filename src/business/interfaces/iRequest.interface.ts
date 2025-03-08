/**
 * IRequest interface.
 * @module src/business/interfaces/iRequest.interface
 */
import { Request } from "express";
import { IUser } from "domain/interfaces/documents/iUser.interface";

/**
 * Extends the Request interface.
 *
 * @interface
 * @extends {Request}
 * @property {IUser} [user] - (Optional) The user returned by passport.js upon successful authentication.
 */
export interface IRequest extends Request {
  /**
   * (Optional) The user returned by passport.js upon successful authentication.
   * @type {IUser}
   */
  user?: IUser;
}
