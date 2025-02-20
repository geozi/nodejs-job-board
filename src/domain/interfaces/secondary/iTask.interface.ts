/**
 * ITask interface.
 * @module src/domain/interfaces/secondary/iTask.interface
 */

/**
 * Represents a job task.
 *
 * @interface
 * @property {string} name - The name of the job task.
 * @property {string} description - The description of the job task.
 */
export interface ITask {
  /**
   * The name of the job task.
   * @type {string}
   */
  name: string;

  /**
   * The description of the job task.
   * @type {string}
   */
  description: string;
}
