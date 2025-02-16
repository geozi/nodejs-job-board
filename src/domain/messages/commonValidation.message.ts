import { commonConstants } from "../constants/common.constant";

export const commonFailedValidation = {
  ORGANIZATION_NAME_REQUIRED_MESSAGE: "Organization name is a required field",
  ORGANIZATION_NAME_MIN_LENGTH_MESSAGE: `Organization name must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,
  IS_ONGOING_REQUIRED_MESSAGE: "IsOngoing is a required field",
  IS_ONGOING_INVALID_MESSAGE: "IsOngoing must be either true or false",
  COUNTRY_INVALID_MESSAGE: `Country must only contain letters and/or whitespaces`,
};
