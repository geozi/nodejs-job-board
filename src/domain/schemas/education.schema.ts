import { Schema } from "mongoose";
import { IEducation } from "../interfaces/secondary/iEducation.interface";
import { educationFailedValidation } from "../messages/educationValidation.message";
import { commonFailedValidation } from "../messages/commonValidation.message";
import { commonConstants } from "../constants/common.constant";

export const educationSchema = new Schema<IEducation>({
  degreeTitle: {
    type: String,
    required: [true, educationFailedValidation.DEGREE_TITLE_REQUIRED_MESSAGE],
    minLength: [
      commonConstants.GENERIC_MIN_LENGTH,
      educationFailedValidation.DEGREE_TITLE_MIN_LENGTH_MESSAGE,
    ],
    trim: true,
  },
  institution: {
    type: String,
    required: [true, educationFailedValidation.INSTITUTION_REQUIRED_MESSAGE],
    minLength: [
      commonConstants.GENERIC_MIN_LENGTH,
      educationFailedValidation.INSTITUTION_MIN_LENGTH_MESSAGE,
    ],
    trim: true,
  },
  startingDate: {
    type: Schema.Types.Date,
    required: [true, educationFailedValidation.STARTING_DATE_REQUIRED_MESSAGE],
  },
  graduationDate: {
    type: Schema.Types.Date,
  },
  isOngoing: {
    type: Schema.Types.Boolean,
    required: [true, commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE],
  },
});
