/**
 * RoleType enums.
 * @module src/domain/enums/roleType.enum
 */

/**
 * Enums corresponding to user roles.
 *
 * @readonly
 * @enum
 */
export enum RoleType {
  /**
   * Admin role.
   * @readonly
   * @type {string}
   */
  Admin = "Admin",

  /**
   * User role.
   * @readonly
   * @type {string}
   */
  User = "User",
}

/**
 * Role type array.
 * @type {Array<RoleType>}
 */
export const roleTypeArray = [RoleType.Admin, RoleType.User];
