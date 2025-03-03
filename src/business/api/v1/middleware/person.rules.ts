import { check, ValidationChain } from "express-validator";
import { personFailedValidation } from "../../../../domain/messages/personValidation.message";
import { personConstants } from "../../../../domain/constants/person.constant";
import {
  COUNTRY_REGEX,
  DATE_REGEX,
  ID_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
} from "../../../../domain/resources/validationRegExp";
import { commonConstants } from "../../../../domain/constants/common.constant";
import { userFailedValidation } from "../../../../domain/messages/userValidation.message";
import { userConstants } from "../../../../domain/constants/user.constant";
import { educationFailedValidation } from "../../../../domain/messages/educationValidation.message";
import { commonFailedValidation } from "../../../../domain/messages/commonValidation.message";
import { workExperienceFailedValidation } from "../../../../domain/messages/workExperienceValidation.message";
import { workExperienceConstants } from "../../../../domain/constants/workExperience.constant";

function isBoolean(value: string) {
  let result = false;
  if (value === "true" || value === "false") {
    result = true;
  }

  return result;
}

export const personInfoCreationRules = (): ValidationChain[] => {
  return [
    check("firstName")
      .notEmpty()
      .withMessage(personFailedValidation.FIRST_NAME_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: personConstants.PERSON_NAME_MIN_LENGTH })
      .withMessage(personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(personFailedValidation.FIRST_NAME_INVALID_MESSAGE),

    check("lastName")
      .notEmpty()
      .withMessage(personFailedValidation.LAST_NAME_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: personConstants.PERSON_NAME_MIN_LENGTH })
      .withMessage(personFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(personFailedValidation.LAST_NAME_INVALID_MESSAGE),

    check("phoneNumber")
      .notEmpty()
      .withMessage(personFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE)
      .bail()
      .matches(PHONE_REGEX)
      .withMessage(personFailedValidation.PHONE_NUMBER_INVALID_MESSAGE),

    check("address")
      .notEmpty()
      .withMessage(personFailedValidation.ADDRESS_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: commonConstants.GENERIC_MIN_LENGTH })
      .withMessage(personFailedValidation.ADDRESS_BELOW_MIN_LENGTH_MESSAGE),

    check("dateOfBirth")
      .optional()
      .matches(DATE_REGEX)
      .withMessage(personFailedValidation.DATE_OF_BIRTH_INVALID_MESSAGE),

    check("education")
      .notEmpty()
      .withMessage(personFailedValidation.EDUCATION_REQUIRED)
      .bail()
      .isArray()
      .withMessage(personFailedValidation.EDUCATION_INVALID_FORMAT)
      .custom((educationArray) => {
        if (educationArray.length > 5) {
          throw new Error(personFailedValidation.EDUCATION_TOO_LONG);
        }
        return true;
      })
      .custom(async (educationArray) => {
        if (Array.isArray(educationArray) && educationArray.length > 0) {
          for (let i = 0; i < educationArray.length; i++) {
            const item = educationArray[i];

            if (!item.degreeTitle) {
              throw new Error(
                educationFailedValidation.DEGREE_TITLE_REQUIRED_MESSAGE
              );
            } else if (
              item.degreeTitle.length < commonConstants.GENERIC_MIN_LENGTH
            ) {
              throw new Error(
                educationFailedValidation.DEGREE_TITLE_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.institution) {
              throw new Error(
                educationFailedValidation.INSTITUTION_REQUIRED_MESSAGE
              );
            } else if (
              item.institution.length < commonConstants.GENERIC_MIN_LENGTH
            ) {
              throw new Error(
                educationFailedValidation.INSTITUTION_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.startingDate) {
              throw new Error(
                educationFailedValidation.STARTING_DATE_REQUIRED_MESSAGE
              );
            } else if (!DATE_REGEX.test(item.startingDate)) {
              throw new Error(
                educationFailedValidation.STARTING_DATE_INVALID_MESSAGE
              );
            }

            if (item.graduationDate && !DATE_REGEX.test(item.graduationDate)) {
              throw new Error(
                educationFailedValidation.GRADUATION_DATE_INVALID_MESSAGE
              );
            }

            if (!item.isOngoing) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE
              );
            } else if (!isBoolean(item.isOngoing)) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_INVALID_MESSAGE
              );
            }
          }
        }
        return true;
      }),

    check("workExperience")
      .notEmpty()
      .withMessage(personFailedValidation.WORK_EXPERIENCE_REQUIRED)
      .bail()
      .isArray()
      .withMessage(personFailedValidation.WORK_EXPERIENCE_INVALID_FORMAT)
      .custom((workExperienceArray) => {
        if (workExperienceArray.length > 5) {
          throw new Error(personFailedValidation.WORK_EXPERIENCE_TOO_LONG);
        }
        return true;
      })
      .custom(async (workExperienceArray) => {
        if (
          Array.isArray(workExperienceArray) &&
          workExperienceArray.length > 0
        ) {
          for (let i = 0; i < workExperienceArray.length; i++) {
            const item = workExperienceArray[i];

            if (!item.jobTitle) {
              throw new Error(
                workExperienceFailedValidation.JOB_TITLE_REQUIRED_MESSAGE
              );
            } else if (
              item.jobTitle.length <
              workExperienceConstants.JOB_TITLE_MIN_LENGTH
            ) {
              throw new Error(
                workExperienceFailedValidation.JOB_TITLE_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.organizationName) {
              throw new Error(
                commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE
              );
            } else if (
              item.organizationName.length < commonConstants.GENERIC_MIN_LENGTH
            ) {
              throw new Error(
                commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.city) {
              throw new Error(
                workExperienceFailedValidation.CITY_REQUIRED_MESSAGE
              );
            }

            if (item.country && !COUNTRY_REGEX.test(item.country)) {
              throw new Error(commonFailedValidation.COUNTRY_INVALID_MESSAGE);
            }

            if (!item.startingDate) {
              throw new Error(
                workExperienceFailedValidation.STARTING_DATE_REQUIRED_MESSAGE
              );
            } else if (!DATE_REGEX.test(item.startingDate)) {
              throw new Error(
                workExperienceFailedValidation.STARTING_DATE_INVALID_MESSAGE
              );
            }

            if (item.endingDate && !DATE_REGEX.test(item.endingDate)) {
              throw new Error(
                workExperienceFailedValidation.ENDING_DATE_INVALID_MESSAGE
              );
            }

            if (!item.isOngoing) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE
              );
            } else if (!isBoolean(item.isOngoing)) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_INVALID_MESSAGE
              );
            }
          }
        }

        return true;
      }),

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

export const personInfoUpdateRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(personFailedValidation.PERSON_ID_REQUIRED_MESSAGE)
      .bail()
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(personFailedValidation.PERSON_ID_OUT_OF_LENGTH_MESSAGE)
      .matches(ID_REGEX)
      .withMessage(personFailedValidation.PERSON_ID_INVALID_MESSAGE),

    check("firstName")
      .optional()
      .isLength({ min: personConstants.PERSON_NAME_MIN_LENGTH })
      .withMessage(personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(personFailedValidation.FIRST_NAME_INVALID_MESSAGE),

    check("lastName")
      .optional()
      .isLength({ min: personConstants.PERSON_NAME_MIN_LENGTH })
      .withMessage(personFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(personFailedValidation.LAST_NAME_INVALID_MESSAGE),

    check("phoneNumber")
      .optional()
      .matches(PHONE_REGEX)
      .withMessage(personFailedValidation.PHONE_NUMBER_INVALID_MESSAGE),

    check("address")
      .optional()
      .isLength({ min: commonConstants.GENERIC_MIN_LENGTH })
      .withMessage(personFailedValidation.ADDRESS_BELOW_MIN_LENGTH_MESSAGE),

    check("dateOfBirth")
      .optional()
      .matches(DATE_REGEX)
      .withMessage(personFailedValidation.DATE_OF_BIRTH_INVALID_MESSAGE),

    check("education")
      .optional()
      .isArray()
      .withMessage(personFailedValidation.EDUCATION_INVALID_FORMAT)
      .custom((educationArray) => {
        if (educationArray.length > 5) {
          throw new Error(personFailedValidation.EDUCATION_TOO_LONG);
        }
        return true;
      })
      .custom(async (educationArray) => {
        if (Array.isArray(educationArray) && educationArray.length > 0) {
          for (let i = 0; i < educationArray.length; i++) {
            const item = educationArray[i];

            if (!item.degreeTitle) {
              throw new Error(
                educationFailedValidation.DEGREE_TITLE_REQUIRED_MESSAGE
              );
            } else if (
              item.degreeTitle.length < commonConstants.GENERIC_MIN_LENGTH
            ) {
              throw new Error(
                educationFailedValidation.DEGREE_TITLE_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.institution) {
              throw new Error(
                educationFailedValidation.INSTITUTION_REQUIRED_MESSAGE
              );
            } else if (
              item.institution.length < commonConstants.GENERIC_MIN_LENGTH
            ) {
              throw new Error(
                educationFailedValidation.INSTITUTION_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.startingDate) {
              throw new Error(
                educationFailedValidation.STARTING_DATE_REQUIRED_MESSAGE
              );
            } else if (!DATE_REGEX.test(item.startingDate)) {
              throw new Error(
                educationFailedValidation.STARTING_DATE_INVALID_MESSAGE
              );
            }

            if (item.graduationDate && !DATE_REGEX.test(item.graduationDate)) {
              throw new Error(
                educationFailedValidation.GRADUATION_DATE_INVALID_MESSAGE
              );
            }

            if (!item.isOngoing) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE
              );
            } else if (!isBoolean(item.isOngoing)) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_INVALID_MESSAGE
              );
            }
          }
        }
        return true;
      }),

    check("workExperience")
      .optional()
      .isArray()
      .withMessage(personFailedValidation.WORK_EXPERIENCE_INVALID_FORMAT)
      .custom((workExperienceArray) => {
        if (workExperienceArray.length > 5) {
          throw new Error(personFailedValidation.WORK_EXPERIENCE_TOO_LONG);
        }
        return true;
      })
      .custom(async (workExperienceArray) => {
        if (
          Array.isArray(workExperienceArray) &&
          workExperienceArray.length > 0
        ) {
          for (let i = 0; i < workExperienceArray.length; i++) {
            const item = workExperienceArray[i];

            if (!item.jobTitle) {
              throw new Error(
                workExperienceFailedValidation.JOB_TITLE_REQUIRED_MESSAGE
              );
            } else if (
              item.jobTitle.length <
              workExperienceConstants.JOB_TITLE_MIN_LENGTH
            ) {
              throw new Error(
                workExperienceFailedValidation.JOB_TITLE_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.organizationName) {
              throw new Error(
                commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE
              );
            } else if (
              item.organizationName.length < commonConstants.GENERIC_MIN_LENGTH
            ) {
              throw new Error(
                commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE
              );
            }

            if (!item.city) {
              throw new Error(
                workExperienceFailedValidation.CITY_REQUIRED_MESSAGE
              );
            }

            if (item.country && !COUNTRY_REGEX.test(item.country)) {
              throw new Error(commonFailedValidation.COUNTRY_INVALID_MESSAGE);
            }

            if (!item.startingDate) {
              throw new Error(
                workExperienceFailedValidation.STARTING_DATE_REQUIRED_MESSAGE
              );
            } else if (!DATE_REGEX.test(item.startingDate)) {
              throw new Error(
                workExperienceFailedValidation.STARTING_DATE_INVALID_MESSAGE
              );
            }

            if (item.endingDate && !DATE_REGEX.test(item.endingDate)) {
              throw new Error(
                workExperienceFailedValidation.ENDING_DATE_INVALID_MESSAGE
              );
            }

            if (!item.isOngoing) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE
              );
            } else if (!isBoolean(item.isOngoing)) {
              throw new Error(
                commonFailedValidation.IS_ONGOING_INVALID_MESSAGE
              );
            }
          }
        }

        return true;
      }),
    check("username")
      .optional()
      .isLength({ min: userConstants.USERNAME_MIN_LENGTH })
      .withMessage(userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: userConstants.USERNAME_MAX_LENGTH })
      .withMessage(userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};

export const personInfoRetrievalByUsernameRules = (): ValidationChain[] => {
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
