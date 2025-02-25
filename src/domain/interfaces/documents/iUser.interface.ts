/**
 * IUser interface.
 * @module src/domain/interfaces/documents/iUser.interface
 */
import { Document } from "mongoose";
import { RoleType } from "../../enums/roleType.enum";

/**
 * Represents a user.
 *
 * @interface
 * @extends {Document}
 * @property {string} username - The username of a user.
 * @property {string} email - The email of a user.
 * @property {string} password - The password of a user.
 * @property {RoleType} role - An enum representing the role assigned to a user.
 */
export interface IUser extends Document {
  /**
   * The username of a user.
   * @type {string}
   */
  username: string;

  /**
   * The email of a user.
   * @type {string}
   */
  email: string;

  /**
   * The password of a user.
   * @type {string}
   */
  password: string;

  /**
   * An enum representing the role assigned to a user.
   * @type {RoleType}
   */
  role: RoleType;
}
