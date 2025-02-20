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
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {RoleType} role - The role of the user.
 */
export interface IUser extends Document {
  /**
   * The username of the user.
   * @type {string}
   */
  username: string;

  /**
   * The email of the user.
   * @type {string}
   */
  email: string;

  /**
   * The password of the user.
   * @type {string}
   */
  password: string;

  /**
   * The role of the user.
   * @type {RoleType}
   */
  role: RoleType;
}
