/**
 * Person model schema.
 * @module src/domain/models/person.model
 */
import { Schema, model } from "mongoose";
import { IPerson } from "../interfaces/documents/iPerson.interface";
import { personConstants } from "../constants/person.constant";
import { commonConstants } from "../constants/common.constant";
import { personFailedValidation } from "../messages/personValidation.message";
import { NAME_REGEX, PHONE_REGEX } from "../resources/validationRegExp";
import { userFailedValidation } from "../messages/userValidation.message";
import { userConstants } from "../constants/user.constant";
import mongooseUniqueValidator from "mongoose-unique-validator";

/**
 * Person schema for persistence in MongoDB.
 *
 * @type {Schema<IPerson>}
 * @property {string} firstName - The first name of the person.
 * @property {string} lastName - The last name of the person.
 * @property {string} phoneNumber - The phone number of the person.
 * @property {string} address - The address of the person.
 * @property {Date} [dateOfBirth] - (Optional) The date of birth of the person.
 * @property {Schema.Types.Mixed[]} education - The education of the person.
 * @property {Schema.Types.Mixed[]} workExperience - The work experience of the person.
 * @property {string} username - The username of the person.
 */
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
      type: [Schema.Types.Mixed],
      required: true,
    },
    workExperience: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    username: {
      type: String,
      unique: true,
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

personSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} already exists in the database",
  type: "UniqueConstraintError",
});

export const Person = model<IPerson>("Person", personSchema);
