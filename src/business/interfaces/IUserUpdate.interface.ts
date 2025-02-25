/**
 * IUserUpdate interface.
 * @module src/business/interfaces/iUserUpdate.interface
 */
import { Types } from "mongoose";
import { RoleType } from "../../domain/enums/roleType.enum";

/**
 * Represents a DTO used in the update of an existing user profile.
 *
 * @interface
 * @property {Types.ObjectId} id - The ID assigned to a user profile.
 * @property {string} [username] - (Optional) The username of a user.
 * @property {string} [email] - (Optional) The email of a user.
 * @property {string} [password] - (Optional) The password of a user.
 * @property {RoleType} [role] - (Optional) An enum representing the role assigned to a user.
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

  /**
   * (Optional) An enum representing the role assigned to a user.
   * @type {RoleType}
   */
  role?: RoleType;
}
