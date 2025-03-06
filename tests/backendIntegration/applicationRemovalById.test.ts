import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import assert from "assert";
import { Application } from "domain/models/application.model";
import { removalByIdMiddlewareArray } from "business/api/v1/controllers/application.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { removeApplicationById } from "service/application.service";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { applicationFailedValidation } from "domain/messages/applicationValidation.message";
import { invalidObjectIdInputs } from "../../tests/testInputs";
import { commonServiceMessages } from "service/messages/commonService.message";
import { applicationServiceMessages } from "service/messages/applicationService.message";

describe("Application removal by ID integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  let mockId = "67c96b8bb5fe88333b7fa53a";
  let mockDeletedApplication = new Application({ _id: mockId });

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "findByIdAndDelete");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = {
        body: { id: mockId },
      };
    });

    it("application ID is valid", async () => {
      functionStub.resolves(mockDeletedApplication);

      for (const middleware of removalByIdMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;

      assert.strictEqual(statusStub.calledWith(httpCodes.NO_CONTENT), true);
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
      describe("bad requests (400)", () => {
        beforeEach(() => {
          sinon.restore();
          sinon.replace(
            { removeApplicationById },
            "removeApplicationById",
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

        it("application ID is undefined", async () => {
          req = { body: { id: undefined } };

          for (const middleware of removalByIdMiddlewareArray) {
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
                    applicationFailedValidation.APPLICATION_ID_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        invalidObjectIdInputs.OBJECT_ID_LENGTH_CASES.forEach(
          ([testName, invalidLengthId]) => {
            it(testName, async () => {
              req = { body: { id: invalidLengthId } };

              for (const middleware of removalByIdMiddlewareArray) {
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
                        applicationFailedValidation.APPLICATION_ID_OUT_OF_LENGTH_MESSAGE,
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

              for (const middleware of removalByIdMiddlewareArray) {
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
                        applicationFailedValidation.APPLICATION_ID_INVALID_MESSAGE,
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
        functionStub = sinon.stub(Application, "findByIdAndDelete");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = {
          body: { id: mockId },
        };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of removalByIdMiddlewareArray) {
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

        for (const middleware of removalByIdMiddlewareArray) {
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
