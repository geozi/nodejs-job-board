/**
 * Person constants.
 * @module src/domain/constants/person.constant
 */

/**
 * Contains numeric constants used in the person model.
 *
 * @type {object}
 * @property {number} PERSON_NAME_MIN_LENGTH - The minimum length accepted for a person's both first and last names.
 * @property {number} EDU_RECORD_MIN_NUMBER - The minimum number of education records that a person can submit.
 * @property {number} WORK_EXPERIENCE_MIN_NUMBER - The minimum number of work experience records that a person can submit.
 */
export const personConstants = {
  /**
   * The minimum length accepted for a person's both first and last names.
   * @type {number}
   */
  PERSON_NAME_MIN_LENGTH: 2,

  /**
   * The minimum number of education records that a person can submit.
   * @type {number}
   */
  EDU_RECORD_MIN_NUMBER: 5,

  /**
   * The minimum number of work experience records that a person can submit.
   * @type {number}
   */
  WORK_EXPERIENCE_MIN_NUMBER: 5,
};
