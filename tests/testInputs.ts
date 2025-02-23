import { Schema } from "mongoose";
import { RoleType } from "../src/domain/enums/roleType.enum";
import { WorkType } from "../src/domain/enums/workType.enum";
import { EmploymentType } from "../src/domain/enums/employmentType.enum";
import { ExperienceLevelType } from "../src/domain/enums/experienceLevelType.enum";
import { ListingStatus } from "../src/domain/enums/listingStatus.enum";

export const invalidUserInputs = {
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
  education: [],
  workExperience: [],
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

export const validTaskInputs = [
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

export const validListingInput = {
  title: "Senior Software Engineer",
  organizationName: "Tech Innovators Inc.",
  datePosted: new Date("2025-02-19"),
  workType: WorkType.Hybrid,
  employmentType: EmploymentType.Full_Time,
  experienceLevel: ExperienceLevelType.Mid_Senior_Level,
  city: "Kalamaria",
  country: "Greece",
  listingDesc: `We are seeking a Senior Software Engineer to join our dynamic team at Tech Innovators Inc. The ideal candidate will have 5+ years of experience in software development, proficiency in JavaScript, and a passion for building innovative solutions. Responsibilities include designing, coding, and testing software applications, collaborating with cross-functional teams, and mentoring junior developers.`,
  salaryRange: {
    minAmount: 60000,
    maxAmount: 80000,
  },
  status: ListingStatus.Open,
};

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

export const invalidCommonInputs = {
  TOO_SHORT_ORGANIZATION_NAME: "Org",
  INVALID_COUNTRY_CASES: [
    ["country name contains special symbol", "Bosnia & Herzegovina"],
    ["country name contains numbers", "Timor-Leste123"],
    ["country name contains an apostrophe", "Côte d'Ivoire"],
    ["country name contains underscores", "Papua_New_Guinea"],
    ["country name contains dollar sign", "Curaçao$"],
  ],
};

export const invalidWorkExperienceInputs = {
  TOO_SHORT_JOB_TITLE: "IT",
};

export const invalidTaskInputs = {
  TOO_SHORT_TASK_NAME: "Edit",
  TOO_LONG_TASK_NAME: `Submit quarterly financial report with detailed analysis on market trends, competitive landscape, and future projections.`,
  TOO_SHORT_DESCRIPTION: "Review docs",
  TOO_LONG_DESCRIPTION: `Please review the complete documentation for the new software module, paying particular attention to the integration points with existing systems. Provide detailed feedback on any potential issues, inconsistencies, or areas for improvement. Ensure that all user scenarios are thoroughly tested and documented.`,
};

export const invalidListingInputs = {
  INVALID_WORK_TYPE: "Local",
  INVALID_EMPLOYMENT_TYPE: "Some_time",
  INVALID_EXPERIENCE_LEVEL: "Pro",
  INVALID_STATUS: "Under review",
  TOO_SHORT_LISTING_DESCRIPTION: "Desc",
  TOO_LONG_LISTING_DESCRIPTION: `Job Description:

We are seeking a highly skilled and experienced Senior Software Engineer to join our dynamic team at Tech Innovators Inc. As a leading technology company, we are dedicated to innovation, creativity, and pushing the boundaries of what is possible. The ideal candidate will have a deep understanding of software development, excellent problem-solving skills, and a passion for building high-quality software solutions.

Responsibilities:

    Design and Architecture:

        Lead the design and architecture of complex software systems, ensuring scalability, performance, and maintainability.

        Collaborate with cross-functional teams to define system requirements, develop technical specifications, and create architectural blueprints.

        Evaluate and recommend tools, technologies, and processes to ensure the highest quality software development practices.

    Development and Coding:

        Write clean, efficient, and maintainable code in multiple programming languages, with a focus on JavaScript, Python, and Java.

        Develop and implement software solutions that meet the needs of our clients and end-users.

        Perform code reviews and provide constructive feedback to junior developers, promoting best practices and continuous improvement.

    Testing and Quality Assurance:

        Create and execute comprehensive test plans to ensure software functionality, performance, and security.

        Collaborate with QA engineers to identify and resolve defects, ensuring the highest level of software quality.

        Implement automated testing frameworks to streamline the testing process and improve efficiency.

    Project Management:

        Lead and manage software development projects from inception to completion, ensuring timely delivery and adherence to budget constraints.

        Coordinate with project managers, product owners, and stakeholders to define project scope, objectives, and deliverables.

        Track project progress, identify potential risks, and implement mitigation strategies to ensure successful project outcomes.

    Mentorship and Leadership:

        Mentor and guide junior developers, fostering a collaborative and inclusive team environment.

        Provide technical leadership and expertise to drive continuous improvement and innovation within the team.

        Facilitate knowledge sharing and professional development through workshops, training sessions, and code reviews.

    Client and Stakeholder Interaction:

        Engage with clients and stakeholders to understand their needs, provide technical guidance, and deliver customized software solutions.

        Communicate project status, updates, and technical details to non-technical stakeholders, ensuring transparency and alignment.

        Build and maintain strong relationships with clients, partners, and industry experts to drive business growth and innovation.

Qualifications:

    Bachelor's or Master's degree in Computer Science, Software Engineering, or a related field.

    7+ years of experience in software development, with a proven track record of delivering high-quality software solutions.

    Expertise in multiple programming languages, including JavaScript, Python, Java, and C++.

    Strong understanding of software development methodologies, tools, and processes, including Agile and DevOps practices.

    Experience with cloud platforms (e.g., AWS, Azure, Google Cloud) and containerization technologies (e.g., Docker, Kubernetes).

    Excellent problem-solving skills and the ability to think critically and creatively.

    Strong communication and interpersonal skills, with the ability to work effectively in a collaborative team environment.

    Proven leadership and mentorship abilities, with a passion for developing and growing talent.

Salary Range:

    Minimum: €60,000

    Maximum: €80,000

    Currency: EUR

Benefits:

    Comprehensive health, dental, and vision insurance.

    Generous paid time off and holiday leave.

    Professional development opportunities, including conferences, workshops, and certifications.

    Flexible work hours and remote work options.

    Employee wellness programs and fitness facilities.

    On-site meals and snacks.

About Tech Innovators Inc.:

Tech Innovators Inc. is a leading technology company dedicated to pushing the boundaries of innovation and creativity. Our mission is to develop cutting-edge software solutions that empower businesses and individuals to achieve their full potential. We pride ourselves on fostering a collaborative, inclusive, and dynamic work environment where creativity and innovation thrive.

At Tech Innovators Inc., we believe in investing in our employees' growth and development. We offer a range of professional development opportunities, including workshops, training sessions, and conferences, to help our team members stay at the forefront of the industry. Our commitment to excellence is reflected in our state-of-the-art facilities, comprehensive benefits, and supportive work culture.

We are passionate about making a positive impact on the world through technology, and we are always looking for talented individuals who share our vision and values. If you are a dedicated and skilled Senior Software Engineer with a passion for innovation and excellence, we would love to hear from you.

How to Apply:

Please submit your resume, cover letter, and portfolio of relevant projects to [email address] with the subject line "Senior Software Engineer Application - [Your Name]." We look forward to reviewing your application and discussing how you can contribute to our team's success.`,
};

export const validApplicationInput = {
  personId: "67b605a836fe1a8bb86b7874",
  listingId: "67b605ae4098030467b29c66",
};

export const invalidObjectIdInputs = {
  OBJECT_ID_LENGTH_CASES: [
    ["ObjectId is too short", "67710722913928977"],
    [
      "ObjectId is too long",
      "67710722913928977aa04ea067710722913928977aa04ea0",
    ],
  ] as [string, string][],
  OBJECT_ID_INVALID_CASES: [
    ["ObjectId contains special symbols", "67*db12ed*29a1*ed143e37e"],
    ["ObjectId contains white spaces", "6771 722 13928977aa04ea0"],
    ["ObjectId contains capital letters", "67710722913928977AA04ea0"],
  ] as [string, string][],
};
