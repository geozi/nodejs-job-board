import { commonConstants } from "../constants/common.constant";

export const applicationFailedValidation = {
  PERSON_ID_REQUIRED_MESSAGE: "Person ID is a required field",
  PERSON_ID_INVALID_MESSAGE: "Person ID must be a string of hex characters",
  PERSON_ID_OUT_OF_LENGTH_MESSAGE: `Person ID must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
  LISTING_ID_REQUIRED_MESSAGE: "Listing ID is a required field",
  LISTING_ID_INVALID_MESSAGE: "Listing ID must be a string of hex characters",
  LISTING_ID_OUT_OF_LENGTH_MESSAGE: `Listing ID must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
};
