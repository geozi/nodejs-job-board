import { Request, Response } from "express";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { User } from "domain/models/user.model";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { retrievalByUsernameMiddlewareArray } from "business/api/v1/controllers/user.controller";
import assert from "assert";
import { httpCodes } from "business/codes/responseStatusCodes";
import { userControllerResponseMessages } from "business/messages/userControllerResponse.message";
import { retrieveUserByUsername } from "service/user.service";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { userFailedValidation } from "domain/messages/userValidation.message";
import { userServiceMessages } from "service/messages/userService.message";
import { commonServiceMessages } from "service/messages/commonService.message";

describe("User retrieval by username integration tests", () => {
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
      functionStub = sinon.stub(User, "findOne");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = { body: { username: validUserInput.username } };
    });

    it("username is valid", async () => {
      functionStub.resolves(mockUser);

      for (const middleware of retrievalByUsernameMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: userControllerResponseMessages.USER_RETRIEVED,
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
          sinon.replace(
            { retrieveUserByUsername },
            "retrieveUserByUsername",
            sinon.fake()
          );
          res = {
            status: sinon.stub().callsFake(() => {
              return res;
            }) as unknown as SinonStub,
            json: sinon.spy(),
          };

          next = sinon.spy();
        });

        it("username is undefined", async () => {
          req = { body: { username: undefined } };

          for (const middleware of retrievalByUsernameMiddlewareArray) {
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
          req = { body: { username: invalidUserInputs.TOO_SHORT_USERNAME } };

          for (const middleware of retrievalByUsernameMiddlewareArray) {
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
          req = { body: { username: invalidUserInputs.TOO_LONG_USERNAME } };

          for (const middleware of retrievalByUsernameMiddlewareArray) {
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
      });
    });

    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(User, "findOne");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = { body: { username: validUserInput.username } };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of retrievalByUsernameMiddlewareArray) {
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

      it("not found (404)", async () => {
        functionStub.resolves(null);

        for (const middleware of retrievalByUsernameMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: userServiceMessages.USER_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
