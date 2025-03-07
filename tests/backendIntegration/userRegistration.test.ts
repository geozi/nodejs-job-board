import { Request, Response } from "express";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { createUser } from "service/user.service";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { registrationMiddlewareArray } from "business/api/v1/controllers/user.controller";
import assert from "assert";
import { httpCodes } from "business/codes/responseStatusCodes";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { userFailedValidation } from "domain/messages/userValidation.message";
import { userControllerResponseMessages } from "business/messages/userControllerResponse.message";
import { User } from "domain/models/user.model";
import { commonServiceMessages } from "service/messages/commonService.message";
import { Error } from "mongoose";

describe("User registration integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockUser = new User(validUserInput);

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User.prototype, "save");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = { body: JSON.parse(JSON.stringify(validUserInput)) };
    });

    it("has valid inputs", async () => {
      functionStub.resolves(mockUser);

      for (const middleware of registrationMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: userControllerResponseMessages.USER_REGISTERED,
          data: mockUser,
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
          sinon.replace({ createUser }, "createUser", sinon.fake());
          res = {
            status: sinon.stub().callsFake(() => {
              return res;
            }) as unknown as SinonStub,
            json: sinon.spy(),
          };

          next = sinon.spy();
          req = { body: JSON.parse(JSON.stringify(validUserInput)) };
        });

        it("username is undefined", async () => {
          req.body.username = undefined;

          for (const middleware of registrationMiddlewareArray) {
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
                { message: userFailedValidation.USERNAME_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("username is too short", async () => {
          req.body.username = invalidUserInputs.TOO_SHORT_USERNAME;

          for (const middleware of registrationMiddlewareArray) {
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
                    userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("username is too long", async () => {
          req.body.username = invalidUserInputs.TOO_LONG_USERNAME;

          for (const middleware of registrationMiddlewareArray) {
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
                    userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("email is undefined", async () => {
          req.body.email = undefined;

          for (const middleware of registrationMiddlewareArray) {
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
                { message: userFailedValidation.EMAIL_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        invalidUserInputs.EMAIL_INVALID_CASES.forEach(
          ([testName, invalidEmail]) => {
            it(testName, async () => {
              req.body.email = invalidEmail;

              for (const middleware of registrationMiddlewareArray) {
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
                    { message: userFailedValidation.EMAIL_INVALID_MESSAGE },
                  ],
                }),
                true
              );
            });
          }
        );

        it("password is undefined", async () => {
          req.body.password = undefined;

          for (const middleware of registrationMiddlewareArray) {
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
                { message: userFailedValidation.PASSWORD_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("password is too short", async () => {
          req.body.password = invalidUserInputs.TOO_SHORT_PASSWORD;

          for (const middleware of registrationMiddlewareArray) {
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
                    userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        invalidUserInputs.PASSWORD_INVALID_CASES.forEach(
          ([testName, invalidPassword]) => {
            it(testName, async () => {
              req.body.password = invalidPassword;

              for (const middleware of registrationMiddlewareArray) {
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
                        userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE,
                    },
                  ],
                }),
                true
              );
            });
          }
        );

        it("role is undefined", async () => {
          req.body.role = undefined;

          for (const middleware of registrationMiddlewareArray) {
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
              errors: [{ message: userFailedValidation.ROLE_REQUIRED_MESSAGE }],
            }),
            true
          );
        });

        it("role is invalid", async () => {
          req.body.role = invalidUserInputs.ROLE_INVALID;

          for (const middleware of registrationMiddlewareArray) {
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
              errors: [{ message: userFailedValidation.ROLE_INVALID_MESSAGE }],
            }),
            true
          );
        });
      });
    });

    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(User.prototype, "save");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = { body: JSON.parse(JSON.stringify(validUserInput)) };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of registrationMiddlewareArray) {
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

        for (const middleware of registrationMiddlewareArray) {
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
