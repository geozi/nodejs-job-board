import { Schema } from "mongoose";
import { ITask } from "../interfaces/secondary/iTask.interface";
import { taskFailedValidation } from "../messages/taskValidation.message";
import { commonConstants } from "../constants/common.constant";
import { taskConstants } from "../constants/task.constant";

export const taskSchema = new Schema<ITask>({
  name: {
    type: String,
    required: [true, taskFailedValidation.TASK_NAME_REQUIRED_MESSAGE],
    minLength: [
      taskConstants.TASK_NAME_MIN_LENGTH,
      taskFailedValidation.TASK_NAME_MIN_LENGTH_MESSAGE,
    ],
    maxLength: [
      taskConstants.TASK_NAME_MAX_LENGTH,
      taskFailedValidation.TASK_NAME_MAX_LENGTH_MESSAGE,
    ],
    trim: true,
  },
  description: {
    type: String,
    required: [true, taskFailedValidation.TASK_DESCRIPTION_REQUIRED_MESSAGE],
    minLength: [
      commonConstants.GENERIC_MIN_LENGTH,
      taskFailedValidation.TASK_DESCRIPTION_MIN_LENGTH_MESSAGE,
    ],
    maxLength: [
      taskConstants.TASK_DESCRIPTION_MAX_LENGTH,
      taskFailedValidation.TASK_DESCRIPTION_MAX_LENGTH_MESSAGE,
    ],
    trim: true,
  },
});
