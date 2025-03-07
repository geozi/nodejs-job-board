import { Application } from "domain/models/application.model";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import {
  invalidObjectIdInputs,
  validApplicationInput,
} from "../../tests/testInputs";
import { retrievalByUniqueIndexMiddlewareArray } from "business/api/v1/controllers/application.controller";
import assert from "assert";
import { httpCodes } from "business/codes/responseStatusCodes";
import { applicationControllerResponseMessages } from "business/messages/applicationControllerResponse.message";
import { retrieveApplicationByUniqueIndex } from "service/application.service";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { personFailedValidation } from "domain/messages/personValidation.message";
import { listingFailedValidation } from "domain/messages/listingValidation.message";
import { commonServiceMessages } from "service/messages/commonService.message";
import { applicationServiceMessages } from "service/messages/applicationService.message";

describe("Application retrieval by unique index integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockApplication = new Application();

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "findOne");
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
            personId: validApplicationInput.personId,
            listingId: validApplicationInput.listingId,
          })
        ),
      };
    });

    it("has valid inputs", async () => {
      functionStub.resolves(mockApplication);

      for (const middleware of retrievalByUniqueIndexMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: applicationControllerResponseMessages.APPLICATION_RETRIEVED,
          data: mockApplication,
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
            { retrieveApplicationByUniqueIndex },
            "retrieveApplicationByUniqueIndex",
            sinon.fake()
          );
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
                personId: validApplicationInput.personId,
                listingId: validApplicationInput.listingId,
              })
            ),
          };
        });

        it("personId is undefined", async () => {
          req.body.personId = undefined;

          for (const middleware of retrievalByUniqueIndexMiddlewareArray) {
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
                { message: personFailedValidation.PERSON_ID_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("listingId is undefined", async () => {
          req.body.listingId = undefined;

          for (const middleware of retrievalByUniqueIndexMiddlewareArray) {
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
                  message: listingFailedValidation.LISTING_ID_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        invalidObjectIdInputs.OBJECT_ID_LENGTH_CASES.forEach(
          ([testName, invalidLengthId]) => {
            it(testName, async () => {
              req.body.personId = invalidLengthId;

              for (const middleware of retrievalByUniqueIndexMiddlewareArray) {
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
              req.body.listingId = invalidId;

              for (const middleware of retrievalByUniqueIndexMiddlewareArray) {
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
                        listingFailedValidation.LISTING_ID_INVALID_MESSAGE,
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
        functionStub = sinon.stub(Application, "findOne");
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
              personId: validApplicationInput.personId,
              listingId: validApplicationInput.listingId,
            })
          ),
        };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of retrievalByUniqueIndexMiddlewareArray) {
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

      it("not found (404)", async () => {
        functionStub.resolves(null);

        for (const middleware of retrievalByUniqueIndexMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: applicationServiceMessages.APPLICATION_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
