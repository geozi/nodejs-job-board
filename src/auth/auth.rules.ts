/**
 * Express validation rules for authentication and authorization operations.
 * @module src/auth/auth.rules
 */
import { check, header, ValidationChain } from "express-validator";
import { userFailedValidation } from "domain/messages/userValidation.message";
import { userConstants } from "domain/constants/user.constant";
import { PASSWORD_REGEX } from "domain/resources/validationRegExp";
import { TOKEN_REGEX } from "./authRegExp";
import { authResponseMessages } from "./authResponse.message";

/**
 * Returns a validation chain for user login.
 * @returns {ValidationChain[]} Validation chain.
 */
export const userLoginRules = (): ValidationChain[] => {
  return [
    check("username")
      .notEmpty()
      .withMessage(userFailedValidation.USERNAME_REQUIRED_MESSAGE)
      .isLength({ min: userConstants.USERNAME_MIN_LENGTH })
      .bail()
      .withMessage(userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: userConstants.USERNAME_MAX_LENGTH })
      .withMessage(userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE),
    check("password")
      .notEmpty()
      .withMessage(userFailedValidation.PASSWORD_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: userConstants.PASSWORD_MIN_LENGTH })
      .withMessage(userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE)
      .matches(PASSWORD_REGEX)
      .withMessage(userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE),
  ];
};

/**
 * Returns a validation chain for header verification.
 * @returns {ValidationChain[]} Validation chain.
 */
export const headerVerificationRules = (): ValidationChain[] => {
  return [
    header("Authorization")
      .notEmpty()
      .withMessage(authResponseMessages.AUTHORIZATION_HEADER_REQUIRED)
      .bail()
      .matches(TOKEN_REGEX)
      .withMessage(authResponseMessages.AUTHORIZATION_TOKEN_INVALID),
  ];
};
