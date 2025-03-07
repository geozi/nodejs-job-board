/**
 * Express validation rules for user-related operations.
 * @module src/business/apis/v1/middleware/user.rules
 */
import { check, ValidationChain } from "express-validator";
import { userFailedValidation } from "domain/messages/userValidation.message";
import { userConstants } from "domain/constants/user.constant";
import {
  EMAIL_REGEX,
  ID_REGEX,
  PASSWORD_REGEX,
} from "domain/resources/validationRegExp";
import { RoleType } from "domain/enums/roleType.enum";
import { commonConstants } from "domain/constants/common.constant";

/**
 * Returns a validation chain for user registration.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userRegistrationRules = (): ValidationChain[] => {
  return [
    check("username")
      .notEmpty()
      .withMessage(userFailedValidation.USERNAME_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: userConstants.USERNAME_MIN_LENGTH })
      .withMessage(userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: userConstants.USERNAME_MAX_LENGTH })
      .withMessage(userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE),
    check("email")
      .notEmpty()
      .withMessage(userFailedValidation.EMAIL_REQUIRED_MESSAGE)
      .bail()
      .matches(EMAIL_REGEX)
      .withMessage(userFailedValidation.EMAIL_INVALID_MESSAGE),
    check("password")
      .notEmpty()
      .withMessage(userFailedValidation.PASSWORD_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: userConstants.PASSWORD_MIN_LENGTH })
      .withMessage(userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE)
      .matches(PASSWORD_REGEX)
      .withMessage(userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE),
    check("role")
      .notEmpty()
      .withMessage(userFailedValidation.ROLE_REQUIRED_MESSAGE)
      .bail()
      .isIn([RoleType.Admin, RoleType.User])
      .withMessage(userFailedValidation.ROLE_INVALID_MESSAGE),
  ];
};

/**
 * Returns a validation chain for user update.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userUpdateRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(userFailedValidation.USER_ID_REQUIRED_MESSAGE)
      .bail()
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(userFailedValidation.USER_ID_OUT_OF_LENGTH_MESSAGE)
      .matches(ID_REGEX)
      .withMessage(userFailedValidation.USER_ID_INVALID_MESSAGE),
    check("username")
      .optional()
      .isLength({ min: userConstants.USERNAME_MIN_LENGTH })
      .withMessage(userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: userConstants.USERNAME_MAX_LENGTH })
      .withMessage(userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE),
    check("email")
      .optional()
      .matches(EMAIL_REGEX)
      .withMessage(userFailedValidation.EMAIL_INVALID_MESSAGE),
    check("password")
      .optional()
      .isLength({ min: userConstants.PASSWORD_MIN_LENGTH })
      .withMessage(userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE)
      .matches(PASSWORD_REGEX)
      .withMessage(userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE),
  ];
};

/**
 * Returns a validation chain for user retrieval by username.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userRetrievalByUsernameRules = (): ValidationChain[] => {
  return [
    check("username")
      .notEmpty()
      .withMessage(userFailedValidation.USERNAME_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: userConstants.USERNAME_MIN_LENGTH })
      .withMessage(userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: userConstants.USERNAME_MAX_LENGTH })
      .withMessage(userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};

/**
 * Returns a validation chain for user retrieval by email.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userRetrievalByEmailRules = (): ValidationChain[] => {
  return [
    check("email")
      .notEmpty()
      .withMessage(userFailedValidation.EMAIL_REQUIRED_MESSAGE)
      .bail()
      .matches(EMAIL_REGEX)
      .withMessage(userFailedValidation.EMAIL_INVALID_MESSAGE),
  ];
};

/**
 * Returns a validation chain for user retrieval by role.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userRetrievalByRoleRules = (): ValidationChain[] => {
  return [
    check("role")
      .notEmpty()
      .withMessage(userFailedValidation.ROLE_REQUIRED_MESSAGE)
      .bail()
      .isIn([RoleType.Admin, RoleType.User])
      .withMessage(userFailedValidation.ROLE_INVALID_MESSAGE),
  ];
};
