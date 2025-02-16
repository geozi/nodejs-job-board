import { commonConstants } from "../constants/common.constant";

export const educationFailedValidation = {
  DEGREE_TITLE_REQUIRED_MESSAGE: "Degree title is a required field",
  DEGREE_TITLE_MIN_LENGTH_MESSAGE: `Degree title must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,
  INSTITUTION_REQUIRED_MESSAGE: "Institution is a required field",
  INSTITUTION_MIN_LENGTH_MESSAGE: `Institution must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,
  STARTING_DATE_REQUIRED_MESSAGE: "Starting date is a required field",
  STARTING_DATE_INVALID_MESSAGE: "Starting date must be a valid date",
  GRADUATION_DATE_INVALID_MESSAGE: "Graduation date must be a valid date",
};
