import { workExperienceConstants } from "../constants/workExperience.constant";

export const workExperienceFailedValidation = {
  JOB_TITLE_REQUIRED_MESSAGE: "Job title is a required field",
  JOB_TITLE_MIN_LENGTH_MESSAGE: `Job title must be at least ${workExperienceConstants.JOB_TITLE_MIN_LENGTH} characters long`,
  CITY_REQUIRED_MESSAGE: "City is a required field",
  STARTING_DATE_REQUIRED_MESSAGE: "Starting date is a required field",
  STARTING_DATE_INVALID_MESSAGE: "Starting date must be a valid date",
  ENDING_DATE_INVALID_MESSAGE: "Ending date must be a valid date",
};
