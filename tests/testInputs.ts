import { Schema } from "mongoose";
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

export const validPersonInput = {
  firstName: "Jasmine",
  lastName: "Powell",
  phoneNumber: "412-304-0145",
  address: "236 Poplar Street",
  dateOfBirth: new Schema.Types.Date("2001-02-18"),
  username: "newUser",
};

export const validEducationInput = {
  degreeTitle: "Software Engineering",
  institution: "Central University",
  startingDate: new Schema.Types.Date("2018-09-17"),
  graduationDate: new Schema.Types.Date("2022-06-22"),
  isOngoing: new Schema.Types.Boolean("false"),
};

export const validWorkExperienceInput = {
  jobTitle: "IT administrator",
  organizationName: "Imaginary Processing",
  city: "Athens",
  country: "Greece",
  startingDate: "2022-09-09",
  endingDate: undefined,
  isOngoing: new Schema.Types.Boolean("true"),
};

export const taskValidInputs = [
  {
    name: "User Support and Troubleshooting",
    description: `Respond to and resolve user issues with hardware, software, and network systems. This includes setting up new user accounts, troubleshooting login problems, and assisting with software installations or updates. The IT administrator ensures that users have the necessary access and support to perform their jobs effectively.`,
  },
  {
    name: "System Monitoring and Maintenance",
    description: `Monitor the organization's IT infrastructure, including servers, networks, and systems, to ensure they are running smoothly. Perform routine maintenance tasks such as applying patches, updating software, and performing backups. This helps to prevent potential issues and ensures the reliability and security of IT systems.`,
  },
  {
    name: "Network Configuration and Management",
    description: `Assist in the configuration and management of the organization's network. This includes setting up and maintaining network devices such as routers, switches, and firewalls. The IT administrator ensures that the network is secure, efficient, and meets the organization's needs.`,
  },
];

export const invalidPersonInputs = {
  INVALID_FIRST_NAME: "T1m0thy",
  TOO_SHORT_FIRST_NAME: "T",
  INVALID_LAST_NAME: "J3nk1ns*",
  TOO_SHORT_LAST_NAME: "J",
  INVALID_PHONE_NUMBER: "543*123*",
  TOO_SHORT_ADDRESS: "A street",
};

export const invalidEducationInputs = {
  TOO_SHORT_DEGREE_TITLE: "Degree",
  TOO_SHORT_INSTITUTION: "Inst",
};

export const invalidWorkExperienceInputs = {
  TOO_SHORT_JOB_TITLE: "IT",
  TOO_SHORT_ORGANIZATION_NAME: "Org",
  INVALID_COUNTRY_CASES: [
    ["country name contains special symbol", "Bosnia & Herzegovina"],
    ["country name contains numbers", "Timor-Leste123"],
    ["country name contains an apostrophe", "Côte d'Ivoire"],
    ["country name contains underscores", "Papua_New_Guinea"],
    ["country name contains dollar sign", "Curaçao$"],
  ],
};

export const taskInvalidInputs = {
  TOO_SHORT_TASK_NAME: "Edit",
  TOO_LONG_TASK_NAME: `Submit quarterly financial report with detailed analysis on market trends, competitive landscape, and future projections.`,
  TOO_SHORT_DESCRIPTION: "Review docs",
  TOO_LONG_DESCRIPTION: `Please review the complete documentation for the new software module, paying particular attention to the integration points with existing systems. Provide detailed feedback on any potential issues, inconsistencies, or areas for improvement. Ensure that all user scenarios are thoroughly tested and documented.`,
};
