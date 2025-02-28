import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { validPersonInput } from "../testInputs";
import { infoCreationMiddlewareArray } from "../../src/business/api/v1/controllers/person.controller";
import { httpCodes } from "../../src/business/codes/responseStatusCodes";
import { personControllerResponseMessages } from "../../src/business/messages/personControllerResponse.message";
import { Person } from "../../src/domain/models/person.model";
import { createPersonInfo } from "../../src/service/person.service";
import { commonResponseMessages } from "../../src/business/messages/commonResponse.message";
import { personFailedValidation } from "../../src/domain/messages/personValidation.message";

describe("Person info creation integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockPerson = new Person(validPersonInput);

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
        body: {
          dateOfBirth: "2001-02-18",
          ...validPersonInput,
        },
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
            body: {
              dateOfBirth: "2001-02-18",
              ...validPersonInput,
            },
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
                {
                  message:
                    personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
                },
                { message: personFailedValidation.FIRST_NAME_INVALID_MESSAGE },
              ],
            }),
            true
          );
        });
      });
    });
  });
});
