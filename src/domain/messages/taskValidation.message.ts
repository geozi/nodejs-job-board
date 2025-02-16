import { commonConstants } from "../constants/common.constant";
import { taskConstants } from "../constants/task.constant";

export const taskFailedValidation = {
  TASK_NAME_REQUIRED_MESSAGE: "Task name is a required field",
  TASK_NAME_MAX_LENGTH_MESSAGE: `Task name must be no longer than ${taskConstants.TASK_NAME_MAX_LENGTH} characters`,
  TASK_NAME_MIN_LENGTH_MESSAGE: `Task name must be at least ${taskConstants.TASK_NAME_MIN_LENGTH} characters long`,
  TASK_DESCRIPTION_REQUIRED_MESSAGE: "Task description is a required field",
  TASK_DESCRIPTION_MAX_LENGTH_MESSAGE: `Task description must be no longer than ${taskConstants.TASK_DESCRIPTION_MAX_LENGTH} characters`,
  TASK_DESCRIPTION_MIN_LENGTH_MESSAGE: `Task description must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,
};
