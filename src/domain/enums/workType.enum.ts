/**
 * WorkType enums.
 * @module src/domain/enums/workType.enum
 */

/**
 * Enums corresponding to work types.
 *
 * @readonly
 * @enum
 */
export enum WorkType {
  /**
   * On-site work type.
   * @readonly
   * @type {string}
   */
  On_Site = "On-site",

  /**
   * Hybrid work type.
   * @readonly
   * @type {string}
   */
  Hybrid = "Hybrid",

  /**
   * Remote work type.
   * @readonly
   * @type {string}
   */
  Remote = "Remote",
}

export const workTypeArray = [
  WorkType.Hybrid,
  WorkType.On_Site,
  WorkType.Remote,
];
