import { check, ValidationChain } from "express-validator";
import { personFailedValidation } from "../../../../domain/messages/personValidation.message";
import { personConstants } from "../../../../domain/constants/person.constant";
import {
  DATE_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
} from "../../../../domain/resources/validationRegExp";
import { commonConstants } from "../../../../domain/constants/common.constant";
import { userFailedValidation } from "../../../../domain/messages/userValidation.message";
import { userConstants } from "../../../../domain/constants/user.constant";

export const personInfoCreationRules = (): ValidationChain[] => {
  return [
    check("firstName")
      .notEmpty()
      .withMessage(personFailedValidation.FIRST_NAME_REQUIRED_MESSAGE)
      .isLength({ min: personConstants.PERSON_NAME_MIN_LENGTH })
      .withMessage(personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(personFailedValidation.FIRST_NAME_INVALID_MESSAGE),
    check("lastName")
      .notEmpty()
      .withMessage(personFailedValidation.LAST_NAME_REQUIRED_MESSAGE)
      .isLength({ min: personConstants.PERSON_NAME_MIN_LENGTH })
      .withMessage(personFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(personFailedValidation.LAST_NAME_INVALID_MESSAGE),
    check("phoneNumber")
      .notEmpty()
      .withMessage(personFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE)
      .matches(PHONE_REGEX)
      .withMessage(personFailedValidation.PHONE_NUMBER_INVALID_MESSAGE),
    check("address")
      .notEmpty()
      .withMessage(personFailedValidation.ADDRESS_REQUIRED_MESSAGE)
      .isLength({ min: commonConstants.GENERIC_MIN_LENGTH })
      .withMessage(personFailedValidation.ADDRESS_BELOW_MIN_LENGTH_MESSAGE),
    check("dateOfBirth")
      .optional()
      .matches(DATE_REGEX)
      .withMessage(personFailedValidation.DATE_OF_BIRTH_INVALID_MESSAGE),
    check("education")
      .notEmpty()
      .withMessage(personFailedValidation.EDUCATION_REQUIRED),
    check("workExperience")
      .notEmpty()
      .withMessage(personFailedValidation.WORK_EXPERIENCE_REQUIRED),
    check("username")
      .notEmpty()
      .withMessage(userFailedValidation.USERNAME_REQUIRED_MESSAGE)
      .isLength({ min: userConstants.USERNAME_MIN_LENGTH })
      .withMessage(userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: userConstants.USERNAME_MAX_LENGTH })
      .withMessage(userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};
