/**
 * Task constants.
 * @module src/domain/constants/task.constant
 */

/**
 * Contains numeric constants used in the validation of ITask objects.
 *
 * @type {number}
 * @property {number} TASK_NAME_MIN_LENGTH - The minimum length accepted for a task name.
 * @property {number} TASK_NAME_MAX_LENGTH - The maximum length accepted for a task name.
 * @property {number} TASK_DESCRIPTION_MAX_LENGTH - The maximum length accepted for a task description.
 */
export const taskConstants = {
  /**
   * The minimum length accepted for a task name.
   * @type {number}
   */
  TASK_NAME_MIN_LENGTH: 5,

  /**
   * The maximum length accepted for a task name.
   * @type {number}
   */
  TASK_NAME_MAX_LENGTH: 100,

  /**
   * The maximum length accepted for a task description.
   * @type {number}
   */
  TASK_DESCRIPTION_MAX_LENGTH: 300,
};
