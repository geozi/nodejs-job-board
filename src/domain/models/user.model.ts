/**
 * User model schema.
 * @module src/domain/models/user.model
 */
import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { userConstants } from "../constants/user.constant";
import { userFailedValidation } from "../messages/userValidation.message";
import { RoleType } from "../enums/roleType.enum";
import { IUser } from "../interfaces/documents/iUser.interface";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../resources/validationRegExp";

/**
 * User schema for persistence in MongoDB.
 *
 * @type {Schema<IUser>}
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {RoleType} role - The role of the user.
 */
const userSchema = new Schema<IUser>(
  {
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
    email: {
      type: String,
      unique: true,
      required: [true, userFailedValidation.EMAIL_REQUIRED_MESSAGE],
      match: [EMAIL_REGEX, userFailedValidation.EMAIL_INVALID_MESSAGE],
      trim: true,
    },
    password: {
      type: String,
      required: [true, userFailedValidation.PASSWORD_REQUIRED_MESSAGE],
      minLength: [
        userConstants.PASSWORD_MIN_LENGTH,
        userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE,
      ],
      match: [
        PASSWORD_REGEX,
        userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE,
      ],
      trim: true,
    },
    role: {
      type: String,
      required: [true, userFailedValidation.ROLE_REQUIRED_MESSAGE],
      enum: {
        values: [RoleType.Admin, RoleType.User],
        message: userFailedValidation.ROLE_INVALID_MESSAGE,
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} already exists in the database",
  type: "UniqueConstraintError",
});

export const User = model<IUser>("User", userSchema);
