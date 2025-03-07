import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import { invalidUserInputs, validUserInput } from "../../tests/testInputs";
import { userLoginMiddlewareArray } from "auth/auth.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import assert from "assert";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { userFailedValidation } from "domain/messages/userValidation.message";
import { User } from "domain/models/user.model";
import { commonServiceMessages } from "service/messages/commonService.message";
import { authResponseMessages } from "auth/authResponse.message";

describe("User login failure integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let next: SinonSpy;
  let functionStub: SinonStub;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.restore();
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
              username: validUserInput.username,
              password: validUserInput.password,
            })
          ),
        };
      });

      it("username is undefined", async () => {
        req.body.username = undefined;

        for (const middleware of userLoginMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.USERNAME_REQUIRED_MESSAGE },
              {
                message: userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );
      });

      it("username is too short", async () => {
        req.body.username = invalidUserInputs.TOO_SHORT_USERNAME;

        for (const middleware of userLoginMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              {
                message: userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );
      });

      it("username is too long", async () => {
        req.body.username = invalidUserInputs.TOO_LONG_USERNAME;

        for (const middleware of userLoginMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              {
                message: userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );
      });

      it("password is undefined", async () => {
        req.body.password = undefined;

        for (const middleware of userLoginMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              {
                message: userFailedValidation.PASSWORD_REQUIRED_MESSAGE,
              },
            ],
          }),
          true
        );
      });

      it("password is too short", async () => {
        req.body.password = invalidUserInputs.TOO_SHORT_PASSWORD;

        for (const middleware of userLoginMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              {
                message: userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE,
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

            for (const middleware of userLoginMiddlewareArray) {
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
    });
  });

  describe("promise-oriented", () => {
    beforeEach(() => {
      sinon.restore();
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      functionStub = sinon.stub(User, "findOne");
      req = {
        body: JSON.parse(
          JSON.stringify({
            username: validUserInput.username,
            password: validUserInput.password,
          })
        ),
      };
    });

    it("server error (500)", async () => {
      functionStub.rejects();

      for (const middleware of userLoginMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(
        statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR),
        true
      );
      assert.strictEqual(
        jsonSpy.calledWith({ message: commonServiceMessages.SERVER_ERROR }),
        true
      );
    });

    it("authentication failed (401)", async () => {
      functionStub.resolves(null);

      for (const middleware of userLoginMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.UNAUTHORIZED), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: authResponseMessages.AUTHENTICATION_FAILED,
        }),
        true
      );
    });
  });
});
