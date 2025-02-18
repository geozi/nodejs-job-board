import { Schema, model } from "mongoose";
import { IPerson } from "../interfaces/documents/iPerson.interface";
import { personConstants } from "../constants/person.constant";
import { commonConstants } from "../constants/common.constant";
import { personFailedValidation } from "../messages/personValidation.message";
import { NAME_REGEX, PHONE_REGEX } from "../resources/validationRegExp";
import { educationSchema } from "../schemas/education.schema";
import { userFailedValidation } from "../messages/userValidation.message";
import { userConstants } from "../constants/user.constant";
import { workExperienceSchema } from "../schemas/workExperience.schema";

const personSchema = new Schema<IPerson>(
  {
    firstName: {
      type: String,
      required: [true, personFailedValidation.FIRST_NAME_REQUIRED_MESSAGE],
      minLength: [
        personConstants.PERSON_NAME_MIN_LENGTH,
        personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
      ],
      match: [NAME_REGEX, personFailedValidation.FIRST_NAME_INVALID_MESSAGE],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, personFailedValidation.LAST_NAME_REQUIRED_MESSAGE],
      minLength: [
        personConstants.PERSON_NAME_MIN_LENGTH,
        personFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE,
      ],
      match: [NAME_REGEX, personFailedValidation.LAST_NAME_INVALID_MESSAGE],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, personFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE],
      match: [PHONE_REGEX, personFailedValidation.PHONE_NUMBER_INVALID_MESSAGE],
      trim: true,
    },
    address: {
      type: String,
      required: [true, personFailedValidation.ADDRESS_REQUIRED_MESSAGE],
      minLength: [
        commonConstants.GENERIC_MIN_LENGTH,
        personFailedValidation.ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
      ],
      trim: true,
    },
    dateOfBirth: {
      type: Schema.Types.Date,
    },
    education: {
      type: [educationSchema],
      required: true,
    },
    workExperience: {
      type: [workExperienceSchema],
      required: true,
    },
    username: {
      type: String,
      required: [true, userFailedValidation.USERNAME_REQUIRED_MESSAGE],
      minLength: [
        userConstants.USERNAME_MIN_LENGTH,
        userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
      ],
      maxLength: [
        userConstants.USERNAME_MAX_LENGTH,
        userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE,
      ],
      trim: true,
    },
  },
  {
    collection: "persons",
    timestamps: true,
  }
);

export const Person = model<IPerson>("Person", personSchema);
