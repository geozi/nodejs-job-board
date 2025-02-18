import { Schema } from "mongoose";
import { IWorkExperience } from "../interfaces/secondary/iWorkExperience.interface";
import { workExperienceFailedValidation } from "../messages/workExperienceValidation.message";
import { commonFailedValidation } from "../messages/commonValidation.message";
import { commonConstants } from "../constants/common.constant";
import { COUNTRY_REGEX } from "../resources/validationRegExp";
import { taskSchema } from "./task.schema";
import { workExperienceConstants } from "../constants/workExperience.constant";

export const workExperienceSchema = new Schema<IWorkExperience>({
  jobTitle: {
    type: String,
    required: [true, workExperienceFailedValidation.JOB_TITLE_REQUIRED_MESSAGE],
    minLength: [
      workExperienceConstants.JOB_TITLE_MIN_LENGTH,
      workExperienceFailedValidation.JOB_TITLE_MIN_LENGTH_MESSAGE,
    ],
    trim: true,
  },
  organizationName: {
    type: String,
    required: [true, commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE],
    minlength: [
      commonConstants.ORGANIZATION_NAME_MIN_LENGTH,
      commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE,
    ],
    trim: true,
  },
  city: {
    type: String,
    required: [true, workExperienceFailedValidation.CITY_REQUIRED_MESSAGE],
    trim: true,
  },
  country: {
    type: String,
    match: [COUNTRY_REGEX, commonFailedValidation.COUNTRY_INVALID_MESSAGE],
    trim: true,
  },
  startingDate: {
    type: Schema.Types.Date,
    required: [
      true,
      workExperienceFailedValidation.STARTING_DATE_REQUIRED_MESSAGE,
    ],
  },
  endingDate: {
    type: Schema.Types.Date,
  },
  isOngoing: {
    type: Schema.Types.Boolean,
    required: [true, commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE],
  },
  tasks: {
    type: [taskSchema],
  },
});
