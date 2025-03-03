import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { User } from "../../src/domain/models/user.model";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { retrievalByRoleMiddlewareArray } from "../../src/business/api/v1/controllers/user.controller";
import { userControllerResponseMessages } from "../../src/business/messages/userControllerResponse.message";
import { httpCodes } from "../../src/business/codes/responseStatusCodes";
import { retrieveUsersByRole } from "../../src/service/user.service";
import { commonResponseMessages } from "../../src/business/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { userServiceMessages } from "../../src/service/messages/userService.message";

describe("User retrieval by role integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockUsers = [new User(), new User()];

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "find");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = { body: { role: validUserInput.role } };
    });

    it("role is valid", async () => {
      functionStub.resolves(mockUsers);

      for (const middleware of retrievalByRoleMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: userControllerResponseMessages.USER_S_RETRIEVED,
          data: mockUsers,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
      describe("bad request (400)", () => {
        beforeEach(() => {
          sinon.restore();
          sinon.replace(
            { retrieveUsersByRole },
            "retrieveUsersByRole",
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

        it("role is undefined", async () => {
          req = { body: { role: undefined } };

          for (const middleware of retrievalByRoleMiddlewareArray) {
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
          req = { body: { role: invalidUserInputs.ROLE_INVALID } };

          for (const middleware of retrievalByRoleMiddlewareArray) {
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
        functionStub = sinon.stub(User, "find");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = { body: { role: validUserInput.role } };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of retrievalByRoleMiddlewareArray) {
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
        functionStub.resolves([]);

        for (const middleware of retrievalByRoleMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: userServiceMessages.USERS_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
