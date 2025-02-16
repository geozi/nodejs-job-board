import { commonConstants } from "../constants/common.constant";
import { personConstants } from "../constants/person.constant";

export const personFailedValidation = {
  FIRST_NAME_REQUIRED_MESSAGE: "First name is a required field",
  FIRST_NAME_INVALID_MESSAGE: "First name must only contain letters",
  FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE: `First name must be at least ${personConstants.PERSON_NAME_MIN_LENGTH} characters long`,
  LAST_NAME_REQUIRED_MESSAGE: "Last name is a required field",
  LAST_NAME_INVALID_MESSAGE: "Last name must only contain letters",
  LAST_NAME_BELOW_MIN_LENGTH_MESSAGE: `Last name must be at least ${personConstants.PERSON_NAME_MIN_LENGTH} characters long`,
  PHONE_NUMBER_REQUIRED_MESSAGE: "Phone number is a required field",
  PHONE_NUMBER_INVALID_MESSAGE: `Phone number must only contain digits and/or hyphens`,
  ADDRESS_BELOW_MIN_LENGTH_MESSAGE: `Street address must be at least ${commonConstants.GENERIC_MIN_LENGTH} characters long`,
  DATE_OF_BIRTH_INVALID: "Date of Birth must be a Date",
};
