/**
 * Task validation error messages.
 * @module src/domain/messages/taskValidation.message
 */
import { commonConstants } from "../constants/common.constant";
import { taskConstants } from "../constants/task.constant";
import { ITask } from "../interfaces/secondary/iTask.interface";

/**
 * Contains error message(s) that are used when validation of {@link ITask}-complied objects fails.
 *
 * @type {object}
 * @property {string} TASK_NAME_REQUIRED_MESSAGE - Message sent when no task name is provided.
 * @property {string} TASK_NAME_ABOVE_MAX_LENGTH_MESSAGE - Message sent when the provided task name is longer than the accepted maximum length.
 * @property {string} TASK_NAME_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided task name is shorter than the accepted minimum length.
 * @property {string} TASK_DESCRIPTION_REQUIRED_MESSAGE - Message sent when no task description is provided.
 * @property {string} TASK_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE - Message sent when the provided task description is longer than the accepted maximum length.
 * @property {string} TASK_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided task description is shorter than the accepted minimum length.
 */
export const taskFailedValidation = {
  /**
   * Message sent when no task name is provided.
   * @type {string}
   */
  TASK_NAME_REQUIRED_MESSAGE: "Task name is a required field",

  /**
   * Message sent when the provided task name is longer than the accepted maximum length.
   * @type {string}
   */
  TASK_NAME_ABOVE_MAX_LENGTH_MESSAGE: `Task name must be no longer than ${taskConstants.TASK_NAME_MAX_LENGTH} characters`,

  /**
   * Message sent when the provided task name is shorter than the accepted minimum length.
   * @type {string}
   */
  TASK_NAME_BELOW_MIN_LENGTH_MESSAGE: `Task name must be at least ${taskConstants.TASK_NAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no task description is provided.
   * @type {string}
   */
  TASK_DESCRIPTION_REQUIRED_MESSAGE: "Task description is a required field",

  /**
   * Message sent when the provided task description is longer than the accepted maximum length.
   * @type {string}
   */
  TASK_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE: `Task description must be no longer than ${taskConstants.TASK_DESCRIPTION_MAX_LENGTH} characters`,

  /**
   * Message sent when the provided task description is shorter than the accepted minimum length.
   * @type {string}
   */
  TASK_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE: `Task description must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,
};
