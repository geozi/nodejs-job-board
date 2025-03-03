import { body, check, ValidationChain } from "express-validator";
import { listingFailedValidation } from "../../../../domain/messages/listingValidation.message";
import { commonFailedValidation } from "../../../../domain/messages/commonValidation.message";
import { commonConstants } from "../../../../domain/constants/common.constant";
import {
  COUNTRY_REGEX,
  DATE_REGEX,
  ID_REGEX,
} from "../../../../domain/resources/validationRegExp";
import { workTypeArray } from "../../../../domain/enums/workType.enum";
import { employmentTypeArray } from "../../../../domain/enums/employmentType.enum";
import { experienceLevelTypeArray } from "../../../../domain/enums/experienceLevelType.enum";
import { listingConstants } from "../../../../domain/constants/listing.constant";
import { listingStatusArray } from "../../../../domain/enums/listingStatus.enum";
import { salaryRangeFailedValidation } from "../../../../domain/messages/salaryRangeValidation.message";

export const listingCreationRules = (): ValidationChain[] => {
  return [
    check("title")
      .notEmpty()
      .withMessage(listingFailedValidation.TITLE_REQUIRED_MESSAGE)
      .bail(),

    check("organizationName")
      .notEmpty()
      .withMessage(commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: commonConstants.ORGANIZATION_NAME_MIN_LENGTH })
      .withMessage(commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE),

    check("datePosted")
      .notEmpty()
      .withMessage(listingFailedValidation.DATE_POSTED_REQUIRED_MESSAGE)
      .bail()
      .matches(DATE_REGEX)
      .withMessage(listingFailedValidation.DATE_POSTED_INVALID_MESSAGE),

    check("workType")
      .notEmpty()
      .withMessage(listingFailedValidation.WORK_TYPE_REQUIRED_MESSAGE)
      .bail()
      .isIn(workTypeArray)
      .withMessage(listingFailedValidation.WORK_TYPE_INVALID_MESSAGE),

    check("employmentType")
      .notEmpty()
      .withMessage(listingFailedValidation.EMPLOYMENT_TYPE_REQUIRED_MESSAGE)
      .bail()
      .isIn(employmentTypeArray)
      .withMessage(listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE),

    check("experienceLevel")
      .notEmpty()
      .withMessage(listingFailedValidation.EXPERIENCE_LEVEL_REQUIRED_MESSAGE)
      .bail()
      .isIn(experienceLevelTypeArray)
      .withMessage(listingFailedValidation.EXPERIENCE_LEVEL_INVALID_MESSAGE),

    check("city")
      .notEmpty()
      .withMessage(listingFailedValidation.CITY_REQUIRED_MESSAGE),

    check("country")
      .notEmpty()
      .withMessage(listingFailedValidation.COUNTRY_REQUIRED_MESSAGE)
      .bail()
      .matches(COUNTRY_REGEX)
      .withMessage(commonFailedValidation.COUNTRY_INVALID_MESSAGE),

    check("listingDesc")
      .notEmpty()
      .withMessage(listingFailedValidation.LISTING_DESCRIPTION_REQUIRED_MESSAGE)
      .bail()
      .isLength({ min: commonConstants.GENERIC_MIN_LENGTH })
      .withMessage(
        listingFailedValidation.LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE
      )
      .isLength({ max: listingConstants.LISTING_DESCRIPTION_MAX_LENGTH })
      .withMessage(
        listingFailedValidation.LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE
      ),

    check("salaryRange.minAmount")
      .if(body("salaryRange").exists())
      .isNumeric()
      .withMessage(salaryRangeFailedValidation.MIN_AMOUNT_INVALID_MESSAGE)
      .bail()
      .custom(async (value) => {
        if (value < 0) {
          throw new Error(
            salaryRangeFailedValidation.MIN_AMOUNT_NEGATIVE_MESSAGE
          );
        }
      }),

    check("salaryRange.maxAmount")
      .if(body("salaryRange").exists())
      .isNumeric()
      .withMessage(salaryRangeFailedValidation.MAX_AMOUNT_INVALID_MESSAGE)
      .bail()
      .custom(async (value) => {
        if (value < 0) {
          throw new Error(
            salaryRangeFailedValidation.MAX_AMOUNT_NEGATIVE_MESSAGE
          );
        }
      }),

    check("status")
      .notEmpty()
      .withMessage(listingFailedValidation.STATUS_REQUIRED)
      .bail()
      .isIn(listingStatusArray)
      .withMessage(listingFailedValidation.STATUS_INVALID),
  ];
};

export const listingUpdateRules = (): ValidationChain[] => {
  return [
    check("id")
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

    check("title").optional(),

    check("organizationName")
      .optional()
      .isLength({ min: commonConstants.ORGANIZATION_NAME_MIN_LENGTH })
      .withMessage(commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE),

    check("datePosted")
      .optional()
      .matches(DATE_REGEX)
      .withMessage(listingFailedValidation.DATE_POSTED_INVALID_MESSAGE),

    check("workType")
      .optional()
      .isIn(workTypeArray)
      .withMessage(listingFailedValidation.WORK_TYPE_INVALID_MESSAGE),

    check("employmentType")
      .optional()
      .isIn(employmentTypeArray)
      .withMessage(listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE),

    check("experienceLevel")
      .optional()
      .isIn(experienceLevelTypeArray)
      .withMessage(listingFailedValidation.EXPERIENCE_LEVEL_INVALID_MESSAGE),

    check("city").optional(),

    check("country")
      .optional()
      .matches(COUNTRY_REGEX)
      .withMessage(commonFailedValidation.COUNTRY_INVALID_MESSAGE),

    check("listingDesc")
      .optional()
      .isLength({ min: commonConstants.GENERIC_MIN_LENGTH })
      .withMessage(
        listingFailedValidation.LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE
      )
      .isLength({ max: listingConstants.LISTING_DESCRIPTION_MAX_LENGTH })
      .withMessage(
        listingFailedValidation.LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE
      ),

    check("salaryRange.minAmount")
      .if(body("salaryRange").exists())
      .isNumeric()
      .withMessage(salaryRangeFailedValidation.MIN_AMOUNT_INVALID_MESSAGE)
      .bail()
      .custom(async (value) => {
        if (value < 0) {
          throw new Error(
            salaryRangeFailedValidation.MIN_AMOUNT_NEGATIVE_MESSAGE
          );
        }
      }),

    check("salaryRange.maxAmount")
      .if(body("salaryRange").exists())
      .isNumeric()
      .withMessage(salaryRangeFailedValidation.MAX_AMOUNT_INVALID_MESSAGE)
      .bail()
      .custom(async (value) => {
        if (value < 0) {
          throw new Error(
            salaryRangeFailedValidation.MAX_AMOUNT_NEGATIVE_MESSAGE
          );
        }
      }),

    check("status")
      .optional()
      .isIn(listingStatusArray)
      .withMessage(listingFailedValidation.STATUS_INVALID),
  ];
};

export const listingRetrievalByStatusRules = (): ValidationChain[] => {
  return [
    check("status")
      .notEmpty()
      .withMessage(listingFailedValidation.STATUS_REQUIRED)
      .bail()
      .isIn(listingStatusArray)
      .withMessage(listingFailedValidation.STATUS_INVALID),
  ];
};

export const listingRetrievalByWorkTypeRules = (): ValidationChain[] => {
  return [
    check("workType")
      .notEmpty()
      .withMessage(listingFailedValidation.WORK_TYPE_REQUIRED_MESSAGE)
      .bail()
      .isIn(workTypeArray)
      .withMessage(listingFailedValidation.WORK_TYPE_INVALID_MESSAGE),
  ];
};

export const listingRetrievalByEmploymentTypeRules = (): ValidationChain[] => {
  return [
    check("employmentType")
      .notEmpty()
      .withMessage(listingFailedValidation.EMPLOYMENT_TYPE_REQUIRED_MESSAGE)
      .bail()
      .isIn(employmentTypeArray)
      .withMessage(listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE),
  ];
};
