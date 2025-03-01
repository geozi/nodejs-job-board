import assert from "assert";
import { Types } from "mongoose";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { Person } from "../../src/domain/models/person.model";
import { IPersonUpdate } from "../../src/business/interfaces/iPersonUpdate.interface";
import { invalidObjectIdInputs, validPersonInput } from "../testInputs";
import { infoUpdateMiddlewareArray } from "../../src/business/api/v1/controllers/person.controller";
import { httpCodes } from "../../src/business/codes/responseStatusCodes";
import { personControllerResponseMessages } from "../../src/business/messages/personControllerResponse.message";
import { commonResponseMessages } from "../../src/business/messages/commonResponse.message";
import { personFailedValidation } from "../../src/domain/messages/personValidation.message";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { personServiceMessages } from "../../src/service/messages/personService.message";

describe("Person info update integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  const mockId = new Types.ObjectId("67c0a1c259e9c44f1fe88055");
  const mockUpdatePerson: IPersonUpdate = {
    id: mockId,
    firstName: validPersonInput.firstName,
    lastName: validPersonInput.lastName,
  };
  let functionStub: SinonStub;

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findByIdAndUpdate");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
    });

    it("person ID is valid", async () => {
      req = { body: mockUpdatePerson };
      functionStub.resolves(mockUpdatePerson);

      for (const middleware of infoUpdateMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: personControllerResponseMessages.PERSON_UPDATED,
          data: mockUpdatePerson,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
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
      });

      it("person ID is undefined", async () => {
        req = { body: { id: undefined } };

        for (const middleware of infoUpdateMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: personFailedValidation.PERSON_ID_REQUIRED_MESSAGE },
              {
                message: personFailedValidation.PERSON_ID_OUT_OF_LENGTH_MESSAGE,
              },
              { message: personFailedValidation.PERSON_ID_INVALID_MESSAGE },
            ],
          }),
          true
        );
      });

      invalidObjectIdInputs.OBJECT_ID_LENGTH_CASES.forEach(
        ([testName, invalidLengthId]) => {
          it(testName, async () => {
            req = { body: { id: invalidLengthId } };

            for (const middleware of infoUpdateMiddlewareArray) {
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
                      personFailedValidation.PERSON_ID_OUT_OF_LENGTH_MESSAGE,
                  },
                ],
              }),
              true
            );
          });
        }
      );

      invalidObjectIdInputs.OBJECT_ID_INVALID_CASES.forEach(
        ([testName, invalidId]) => {
          it(testName, async () => {
            req = { body: { id: invalidId } };

            for (const middleware of infoUpdateMiddlewareArray) {
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
                    message: personFailedValidation.PERSON_ID_INVALID_MESSAGE,
                  },
                ],
              }),
              true
            );
          });
        }
      );
    });

    describe("Promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(Person, "findByIdAndUpdate");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
      });

      it("server error", async () => {
        req = { body: mockUpdatePerson };
        functionStub.rejects();

        for (const middleware of infoUpdateMiddlewareArray) {
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
        req = { body: mockUpdatePerson };
        functionStub.resolves(null);

        for (const middleware of infoUpdateMiddlewareArray) {
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
