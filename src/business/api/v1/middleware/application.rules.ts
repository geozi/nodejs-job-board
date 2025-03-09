/**
 * Express validation rules for application-related operations.
 * @module src/business/apis/v1/middleware/application.rules
 */
import { check, ValidationChain } from "express-validator";
import { personFailedValidation } from "domain/messages/personValidation.message";
import { commonConstants } from "domain/constants/common.constant";
import { ID_REGEX } from "domain/resources/validationRegExp";
import { listingFailedValidation } from "domain/messages/listingValidation.message";
import { applicationFailedValidation } from "domain/messages/applicationValidation.message";

/**
 * Returns a validation chain for application creation and retrieval by unique index.
 * @returns {ValidationChain[]} Validation chain.
 */
export const applicationCreationAndUniqueIndexRetrievalRules =
  (): ValidationChain[] => {
    return [
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

/**
 * Returns a validation chain for application retrieval by personId.
 * @returns {ValidationChain[]} Validation chain.
 */
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

/**
 * Returns a validation chain for application retrieval by listingId.
 * @returns {ValidationChain[]} Validation chain.
 */
export const applicationRetrievalByListingIdRules = (): ValidationChain[] => {
  return [
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

/**
 * Returns a validation chain for application removal by id.
 * @returns {ValidationChain[]} Validation chain.
 */
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
