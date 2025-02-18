import { RoleType } from "../src/domain/enums/roleType.enum";

export const invalidUserInputs = {
  USER_ID_LENGTH_CASES: [
    ["user ID is too short", "67710722913928977"],
    ["user ID is too long", "67710722913928977aa04ea067710722913928977aa04ea0"],
  ] as [string, string][],
  USER_ID_INVALID_CASES: [
    ["user ID contains special symbols", "67*db12ed*29a1*ed143e37e"],
    ["user ID contains white spaces", "6771 722 13928977aa04ea0"],
    ["user ID contains capital letters", "67710722913928977AA04ea0"],
  ] as [string, string][],
  TOO_SHORT_USERNAME: "ab",
  TOO_LONG_USERNAME: "thisIsAVeryLongUsernameToTest",
  EMAIL_INVALID_CASES: [
    ["email has no prefix", "@mail.com"],
    ["email has no @", "randommail.com"],
    ["email has no domain name", "random@.com"],
    ["email has no .", "random@mailcom"],
    ["email has no top level domain", "random@mail."],
  ] as [string, string][],
  TOO_SHORT_PASSWORD: "E^e;0=",
  PASSWORD_INVALID_CASES: [
    ["password has no uppercase letters", "!]i&u^^.57h3.,%"],
    ["password has no lowercase letters", "+[Q]D~~A,9CGYZ~"],
    ["password has no numbers", "Q}_MC}mdguOs!Gr"],
    ["password has no special symbols", "EyB0McqoXAOYA1Y"],
  ] as [string, string][],
  ROLE_INVALID: "Executive",
};

export const validUserInput = {
  username: "newUser",
  email: "random@mail.com",
  password: "5W]L8t1m4@PcTTO",
  role: RoleType.User,
};
