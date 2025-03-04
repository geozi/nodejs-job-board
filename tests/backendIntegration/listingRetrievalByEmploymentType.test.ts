import sinon, { SinonSpy, SinonStub } from "sinon";
import assert from "assert";
import { Listing } from "domain/models/listing.model";
import { invalidListingInputs, validListingInput } from "../testInputs";
import { Request, Response } from "express";
import { retrievalByEmploymentTypeMiddlewareArray } from "business/api/v1/controllers/listing.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { listingControllerResponseMessages } from "business/messages/listingControllerResponse.message";
import { retrieveListingsByEmploymentType } from "service/listing.service";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { listingFailedValidation } from "domain/messages/listingValidation.message";
import { commonServiceMessages } from "service/messages/commonService.message";
import { listingServiceMessages } from "service/messages/listingService.message";

describe("Listing retrieval by employmentType integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockListings = [new Listing(), new Listing()];

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = {
        body: { employmentType: validListingInput.employmentType.toString() },
      };
    });

    it("employmentType is valid", async () => {
      functionStub.resolves(mockListings);

      for (const middleware of retrievalByEmploymentTypeMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: listingControllerResponseMessages.LISTING_S_RETRIEVED,
          data: mockListings,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", async () => {
    describe("validation-oriented", () => {
      describe("bad requests (400)", () => {
        beforeEach(() => {
          sinon.restore();
          sinon.replace(
            { retrieveListingsByEmploymentType },
            "retrieveListingsByEmploymentType",
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

        it("employmentType is undefined", async () => {
          req = { body: { employmentType: undefined } };

          for (const middleware of retrievalByEmploymentTypeMiddlewareArray) {
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
                    listingFailedValidation.EMPLOYMENT_TYPE_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("employmentType is invalid", async () => {
          req = {
            body: {
              employmentType: invalidListingInputs.INVALID_EMPLOYMENT_TYPE,
            },
          };

          for (const middleware of retrievalByEmploymentTypeMiddlewareArray) {
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
                    listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });
      });
    });

    describe("promise-oriented", async () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(Listing, "find");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = {
          body: { employmentType: validListingInput.employmentType.toString() },
        };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of retrievalByEmploymentTypeMiddlewareArray) {
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
        functionStub.resolves([]);

        for (const middleware of retrievalByEmploymentTypeMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: listingServiceMessages.LISTINGS_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
