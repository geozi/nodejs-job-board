import { check, ValidationChain } from "express-validator";
import { personFailedValidation } from "domain/messages/personValidation.message";
import { commonConstants } from "domain/constants/common.constant";
import { ID_REGEX } from "domain/resources/validationRegExp";
import { listingFailedValidation } from "domain/messages/listingValidation.message";
import { applicationFailedValidation } from "domain/messages/applicationValidation.message";

export const applicationCreationRules = (): ValidationChain[] => {
  return [
    check("personId")
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
    check("listingId")
      .notEmpty()
      .withMessage(listingFailedValidation.LISTING_ID_REQUIRED_MESSAGE)
      .bail()
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(listingFailedValidation.LISTING_ID_OUT_OF_LENGTH_MESSAGE)
      .matches(ID_REGEX)
      .withMessage(listingFailedValidation.LISTING_ID_INVALID_MESSAGE),
  ];
};

export const applicationRetrievalByPersonIdRules = (): ValidationChain[] => {
  return [
    check("personId")
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
  ];
};

export const applicationRemovalByIdRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(applicationFailedValidation.APPLICATION_ID_REQUIRED_MESSAGE)
      .bail()
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(
        applicationFailedValidation.APPLICATION_ID_OUT_OF_LENGTH_MESSAGE
      )
      .matches(ID_REGEX)
      .withMessage(applicationFailedValidation.APPLICATION_ID_INVALID_MESSAGE),
  ];
};
