/**
 * IUserUpdate interface.
 * @module src/business/interfaces/iUserUpdate.interface
 */
import { Types } from "mongoose";

/**
 * Represents a DTO used in the update of an existing user profile.
 *
 * @interface
 * @property {Types.ObjectId} id - The ID assigned to a user profile.
 * @property {string} [username] - (Optional) The username of a user.
 * @property {string} [email] - (Optional) The email of a user.
 * @property {string} [password] - (Optional) The password of a user.
 */
export interface IUserUpdate {
  /**
   * The ID assigned to a user profile.
   * @type {Types.ObjectId}
   */
  id: Types.ObjectId;

  /**
   * (Optional) The username of a user.
   * @type {string}
   */
  username?: string;

  /**
   * (Optional) The email of a user.
   * @type {string}
   */
  email?: string;

  /**
   * (Optional) The password of a user.
   * @type {string}
   */
  password?: string;
}
