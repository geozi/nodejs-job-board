import sinon, { SinonSpy, SinonStub } from "sinon";
import assert from "assert";
import { Request, Response } from "express";
import { invalidUserInputs, validPersonInput } from "../testInputs";
import { Person } from "../../src/domain/models/person.model";
import { infoRetrievalByUsernameMiddlewareArray } from "../../src/business/api/v1/controllers/person.controller";
import { httpCodes } from "../../src/business/codes/responseStatusCodes";
import { personControllerResponseMessages } from "../../src/business/messages/personControllerResponse.message";
import { retrievePersonInfoByUsername } from "../../src/service/person.service";
import { commonResponseMessages } from "../../src/business/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { personServiceMessages } from "../../src/service/messages/personService.message";

describe("Person info retrieval by username integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockPerson = new Person({
    dateOfBirth: new Date("2001-02-18"),
    ...validPersonInput,
  });

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findOne");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = { body: { username: validPersonInput.username } };
    });

    it("username is valid", async () => {
      functionStub.resolves(mockPerson);

      for (const middleware of infoRetrievalByUsernameMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: personControllerResponseMessages.PERSON_RETRIEVED,
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
          sinon.replace(
            { retrievePersonInfoByUsername },
            "retrievePersonInfoByUsername",
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

          for (const middleware of infoRetrievalByUsernameMiddlewareArray) {
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

          for (const middleware of infoRetrievalByUsernameMiddlewareArray) {
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

          for (const middleware of infoRetrievalByUsernameMiddlewareArray) {
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

    describe("Promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(Person, "findOne");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = { body: { username: validPersonInput.username } };
      });

      it("server error", async () => {
        functionStub.rejects();

        for (const middleware of infoRetrievalByUsernameMiddlewareArray) {
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

        for (const middleware of infoRetrievalByUsernameMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: personServiceMessages.PERSON_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
