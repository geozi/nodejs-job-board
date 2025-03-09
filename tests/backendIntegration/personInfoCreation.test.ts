import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonSpy, SinonStub } from "sinon";
import {
  invalidCommonInputs,
  invalidEducationInputs,
  invalidPersonInputs,
  invalidWorkExperienceInputs,
  validEducationInput,
  validPersonInput,
  validUserInput,
  validWorkExperienceInput,
} from "../testInputs";
import { infoCreationMiddlewareArray } from "business/api/v1/controllers/person.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { personControllerResponseMessages } from "business/messages/personControllerResponse.message";
import { Person } from "domain/models/person.model";
import { createPersonInfo } from "service/person.service";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { personFailedValidation } from "domain/messages/personValidation.message";
import { commonServiceMessages } from "service/messages/commonService.message";
import { Error } from "mongoose";
import { educationFailedValidation } from "domain/messages/educationValidation.message";
import { commonFailedValidation } from "domain/messages/commonValidation.message";
import { workExperienceFailedValidation } from "domain/messages/workExperienceValidation.message";
import { User } from "domain/models/user.model";

describe("Person info creation integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockUser = new User(validUserInput);
  const mockPerson = new Person({
    dateOfBirth: new Date("2001-02-18"),
    firstName: validPersonInput.firstName,
    lastName: validPersonInput.lastName,
    phoneNumber: validPersonInput.phoneNumber,
    address: validPersonInput.address,
    education: validPersonInput.education,
    workExperience: validPersonInput.workExperience,
    username: mockUser.username,
  });

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person.prototype, "save");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = {
        body: JSON.parse(
          JSON.stringify({
            dateOfBirth: "2001-02-18",
            firstName: validPersonInput.firstName,
            lastName: validPersonInput.lastName,
            phoneNumber: validPersonInput.phoneNumber,
            address: validPersonInput.address,
            education: validPersonInput.education,
            workExperience: validPersonInput.workExperience,
          })
        ),
        user: mockUser,
      };
    });

    it("has valid inputs", async () => {
      functionStub.resolves(mockPerson);

      for (const middleware of infoCreationMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: personControllerResponseMessages.PERSON_REGISTERED,
          data: mockPerson,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
      describe("bad requests (400)", () => {
        beforeEach(() => {
          sinon.restore();
          sinon.replace({ createPersonInfo }, "createPersonInfo", sinon.fake());
          res = {
            status: sinon.stub().callsFake(() => {
              return res;
            }) as unknown as SinonStub,
            json: sinon.spy(),
          };

          next = sinon.spy();
          req = {
            body: JSON.parse(
              JSON.stringify({
                dateOfBirth: "2001-02-18",
                firstName: validPersonInput.firstName,
                lastName: validPersonInput.lastName,
                phoneNumber: validPersonInput.phoneNumber,
                address: validPersonInput.address,
                education: validPersonInput.education,
                workExperience: validPersonInput.workExperience,
              })
            ),
            user: mockUser,
          };
        });

        it("firstName is undefined", async () => {
          req.body.firstName = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                { message: personFailedValidation.FIRST_NAME_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("firstName is too short", async () => {
          req.body.firstName = invalidPersonInputs.TOO_SHORT_FIRST_NAME;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("firstName is invalid", async () => {
          req.body.firstName = invalidPersonInputs.INVALID_FIRST_NAME;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: personFailedValidation.FIRST_NAME_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("lastName is undefined", async () => {
          req.body.lastName = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                { message: personFailedValidation.LAST_NAME_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("lastName is too short", async () => {
          req.body.lastName = invalidPersonInputs.TOO_SHORT_LAST_NAME;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    personFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("lastName is invalid", async () => {
          req.body.lastName = invalidPersonInputs.INVALID_LAST_NAME;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: personFailedValidation.LAST_NAME_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("phoneNumber is undefined", async () => {
          req.body.phoneNumber = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: personFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("phoneNumber is invalid", async () => {
          req.body.phoneNumber = invalidPersonInputs.INVALID_PHONE_NUMBER;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: personFailedValidation.PHONE_NUMBER_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("address is undefined", async () => {
          req.body.address = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                { message: personFailedValidation.ADDRESS_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("address is too short", async () => {
          req.body.address = invalidPersonInputs.TOO_SHORT_ADDRESS;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    personFailedValidation.ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("education is undefined", async () => {
          req.body.education = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: personFailedValidation.EDUCATION_REQUIRED,
                },
              ],
            }),
            true
          );
        });

        it("edu degreeTitle title is undefined", async () => {
          req.body.education.push({ degreeTitle: undefined });

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    educationFailedValidation.DEGREE_TITLE_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu degreeTitle is too short", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].degreeTitle =
            invalidEducationInputs.TOO_SHORT_DEGREE_TITLE;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    educationFailedValidation.DEGREE_TITLE_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu institution is undefined", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].institution = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    educationFailedValidation.INSTITUTION_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu institution is too short", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].institution =
            invalidEducationInputs.TOO_SHORT_INSTITUTION;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    educationFailedValidation.INSTITUTION_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu startingDate is undefined", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].startingDate = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    educationFailedValidation.STARTING_DATE_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu startingDate is invalid", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].startingDate =
            invalidCommonInputs.INVALID_STARTING_DATE;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    educationFailedValidation.STARTING_DATE_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu graduationDate is invalid", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].graduationDate =
            invalidEducationInputs.INVALID_GRADUATION_DATE;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    educationFailedValidation.GRADUATION_DATE_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu isOngoing is undefined", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].isOngoing = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("edu isOngoing is invalid", async () => {
          let test = { ...validEducationInput };
          req.body.education.push(test);
          req.body.education[0].isOngoing =
            invalidCommonInputs.INVALID_IS_ONGOING;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: commonFailedValidation.IS_ONGOING_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExperience is undefined", async () => {
          req.body.workExperience = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: personFailedValidation.WORK_EXPERIENCE_REQUIRED,
                },
              ],
            }),
            true
          );
        });

        it("workExp jobTitle is undefined", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].jobTitle = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    workExperienceFailedValidation.JOB_TITLE_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp jobTitle is too short", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].jobTitle =
            invalidWorkExperienceInputs.TOO_SHORT_JOB_TITLE;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    workExperienceFailedValidation.JOB_TITLE_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp organizationName is undefined", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].organizationName = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp organizationName is too short", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].organizationName =
            invalidCommonInputs.TOO_SHORT_ORGANIZATION_NAME;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp city is undefined", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].city = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: workExperienceFailedValidation.CITY_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        invalidCommonInputs.INVALID_COUNTRY_CASES.forEach(
          ([testName, invalidCountryName]) => {
            it(testName, async () => {
              let test = { ...validWorkExperienceInput };
              req.body.workExperience.push(test);
              req.body.workExperience[0].country = invalidCountryName;

              for (const middleware of infoCreationMiddlewareArray) {
                await middleware(req as Request, res as Response, next);
              }

              statusStub = res.status as SinonStub;
              jsonSpy = res.json as SinonSpy;

              assert.strictEqual(
                statusStub.calledWith(httpCodes.BAD_REQUEST),
                true
              );
              assert.strictEqual(
                jsonSpy.calledWith({
                  message: commonResponseMessages.BAD_REQUEST,
                  errors: [
                    {
                      message: commonFailedValidation.COUNTRY_INVALID_MESSAGE,
                    },
                  ],
                }),
                true
              );
            });
          }
        );

        it("workExp startingDate is undefined", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].startingDate = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    workExperienceFailedValidation.STARTING_DATE_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp startingDate is invalid", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].startingDate =
            invalidCommonInputs.INVALID_STARTING_DATE;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    workExperienceFailedValidation.STARTING_DATE_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp endingDate is invalid", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].endingDate =
            invalidWorkExperienceInputs.INVALID_ENDING_DATE;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message:
                    workExperienceFailedValidation.ENDING_DATE_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp isOngoing is undefined", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].isOngoing = undefined;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: commonFailedValidation.IS_ONGOING_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("workExp isOngoing is invalid", async () => {
          let test = { ...validWorkExperienceInput };
          req.body.workExperience.push(test);
          req.body.workExperience[0].isOngoing =
            invalidCommonInputs.INVALID_IS_ONGOING;

          for (const middleware of infoCreationMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                {
                  message: commonFailedValidation.IS_ONGOING_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });
      });
    });

    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(Person.prototype, "save");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = {
          body: JSON.parse(
            JSON.stringify({
              dateOfBirth: "2001-02-18",
              firstName: validPersonInput.firstName,
              lastName: validPersonInput.lastName,
              phoneNumber: validPersonInput.phoneNumber,
              address: validPersonInput.address,
              education: validPersonInput.education,
              workExperience: validPersonInput.workExperience,
            })
          ),
          user: mockUser,
        };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of infoCreationMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR),
          true
        );
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonServiceMessages.SERVER_ERROR,
          }),
          true
        );
      });

      it("Error.ValidationError (400)", async () => {
        functionStub.rejects(new Error.ValidationError());

        for (const middleware of infoCreationMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: "Validation failed",
          }),
          true
        );
      });
    });
  });
});
