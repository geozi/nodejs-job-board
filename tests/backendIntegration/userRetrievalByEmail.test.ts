import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { User } from "../../src/domain/models/user.model";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { retrievalByEmailMiddlewareArray } from "../../src/business/api/v1/controllers/user.controller";
import { httpCodes } from "../../src/business/codes/responseStatusCodes";
import assert from "assert";
import { userControllerResponseMessages } from "../../src/business/messages/userControllerResponse.message";
import { retrieveUserByEmail } from "../../src/service/user.service";
import { commonResponseMessages } from "../../src/business/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { userServiceMessages } from "../../src/service/messages/userService.message";

describe("User retrieval by email integration tests", () => {
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
    });

    it("has valid inputs", async () => {
      req = { body: { email: validUserInput.email } };
      functionStub.resolves(mockUser);

      for (const middleware of retrievalByEmailMiddlewareArray) {
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
            { retrieveUserByEmail },
            "retrieveUserByEmail",
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

        it("email is undefined", async () => {
          req = { body: { email: undefined } };

          for (const middleware of retrievalByEmailMiddlewareArray) {
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
                { message: userFailedValidation.EMAIL_INVALID_MESSAGE },
              ],
            }),
            true
          );
        });

        invalidUserInputs.EMAIL_INVALID_CASES.forEach(
          ([testName, invalidEmail]) => {
            it(testName, async () => {
              req = { body: { email: invalidEmail } };

              for (const middleware of retrievalByEmailMiddlewareArray) {
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
      });
    });

    describe("Promise-oriented", () => {
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
        req = { body: { email: validUserInput.email } };
      });

      it("server error", async () => {
        functionStub.rejects();

        for (const middleware of retrievalByEmailMiddlewareArray) {
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

      it("not found", async () => {
        functionStub.resolves(null);

        for (const middleware of retrievalByEmailMiddlewareArray) {
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
