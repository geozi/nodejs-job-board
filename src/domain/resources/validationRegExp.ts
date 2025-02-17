export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
);

export const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);

export const NAME_REGEX = new RegExp(/^[A-Za-z]+$/);

export const COUNTRY_REGEX = new RegExp(/^[A-Za-z ]+$/);

export const PHONE_REGEX = new RegExp(/^\d+(-\d+)*$/);

export const ID_REGEX = new RegExp(/^[a-f0-9]+$/);
