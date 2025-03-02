/**
 * ExperienceLevelType enums.
 * @module src/domain/enums/experienceLevelType.enum
 */

/**
 * Enums corresponding to experience levels.
 *
 * @readonly
 * @enum
 */
export enum ExperienceLevelType {
  /**
   * Internship experience level.
   * @readonly
   * @type {string}
   */
  Internship = "Internship",

  /**
   * Entry-level experience level.
   * @readonly
   * @type {string}
   */
  Entry_Level = "Entry-level",

  /**
   * Associate experience level.
   * @readonly
   * @type {string}
   */
  Associate = "Associate",

  /**
   * Mid-senior experience level.
   * @readonly
   * @type {string}
   */
  Mid_Senior_Level = "Mid-Senior level",

  /**
   * Director experience level.
   * @readonly
   * @type {string}
   *
   */
  Director = "Director",

  /**
   * Executive experience level.
   * @readonly
   * @type {string}
   */
  Executive = "Executive",
}

export const experienceLevelTypeArray = [
  ExperienceLevelType.Internship,
  ExperienceLevelType.Entry_Level,
  ExperienceLevelType.Mid_Senior_Level,
  ExperienceLevelType.Associate,
  ExperienceLevelType.Director,
  ExperienceLevelType.Executive,
];

export const experienceLevelMap: { [key: string]: ExperienceLevelType } = {
  [ExperienceLevelType.Internship.toString()]: ExperienceLevelType.Internship,
  [ExperienceLevelType.Entry_Level.toString()]: ExperienceLevelType.Entry_Level,
  [ExperienceLevelType.Mid_Senior_Level.toString()]:
    ExperienceLevelType.Mid_Senior_Level,
  [ExperienceLevelType.Associate.toString()]: ExperienceLevelType.Associate,
  [ExperienceLevelType.Director.toString()]: ExperienceLevelType.Director,
  [ExperienceLevelType.Executive.toString()]: ExperienceLevelType.Executive,
};
