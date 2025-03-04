import { Request, Response } from "express";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Types } from "mongoose";
import { User } from "domain/models/user.model";
import { updateMiddlewareArray } from "business/api/v1/controllers/user.controller";
import assert from "assert";
import { httpCodes } from "business/codes/responseStatusCodes";
import { userFailedValidation } from "domain/messages/userValidation.message";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { invalidObjectIdInputs, validUserInput } from "../testInputs";
import { userControllerResponseMessages } from "business/messages/userControllerResponse.message";
import { IUserUpdate } from "business/interfaces/iUserUpdate.interface";
import { commonServiceMessages } from "service/messages/commonService.message";
import { userServiceMessages } from "service/messages/userService.message";

describe("User update integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  const mockId = new Types.ObjectId("67c0a1c259e9c44f1fe88055");
  const mockUserToUpdate: IUserUpdate = {
    id: mockId,
    username: validUserInput.username,
  };
  const mockUpdatedUser = new User(mockUserToUpdate);
  let functionStub: SinonStub;

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findByIdAndUpdate");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = { body: JSON.parse(JSON.stringify(mockUserToUpdate)) };
    });

    it("user ID is valid", async () => {
      functionStub.resolves(mockUpdatedUser);

      for (const middleware of updateMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: userControllerResponseMessages.USER_UPDATED,
          data: mockUpdatedUser,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
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
      });

      it("user ID is undefined", async () => {
        req = { body: { id: undefined } };

        for (const middleware of updateMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.USER_ID_REQUIRED_MESSAGE },
            ],
          }),
          true
        );
      });

      invalidObjectIdInputs.OBJECT_ID_LENGTH_CASES.forEach(
        ([testName, invalidLengthId]) => {
          it(testName, async () => {
            req = { body: { id: invalidLengthId } };

            for (const middleware of updateMiddlewareArray) {
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
                    message: userFailedValidation.USER_ID_OUT_OF_LENGTH_MESSAGE,
                  },
                ],
              }),
              true
            );
          });
        }
      );

      invalidObjectIdInputs.OBJECT_ID_INVALID_CASES.forEach(
        ([testName, invalidID]) => {
          it(testName, async () => {
            req = { body: { id: invalidID } };

            for (const middleware of updateMiddlewareArray) {
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
                  { message: userFailedValidation.USER_ID_INVALID_MESSAGE },
                ],
              }),
              true
            );
          });
        }
      );
    });

    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(User, "findByIdAndUpdate");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = { body: JSON.parse(JSON.stringify(mockUserToUpdate)) };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of updateMiddlewareArray) {
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

        for (const middleware of updateMiddlewareArray) {
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
